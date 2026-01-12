import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { useAuthUser } from "./hooks/auth-user";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userRole = (payload as any).role;

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/profile", "/player/:path*", "/dashboard/:path*"],
};
