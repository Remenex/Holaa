/* eslint-disable @next/next/no-page-custom-font */
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/context/user-context";
import { baloo2, bigShouldersDisplay } from "@/lib/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShouldersDisplay.variable} ${baloo2.variable}`}
    >
      <head></head>
      <body>
        <SessionProvider>
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: {
                fontSize: "1rem",
                fontFamily: "var(--font-baloo2)",
              },
            }}
          />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
