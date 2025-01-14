"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Params = {
  children: ReactNode;
  href: string;
};

export default function ActiveLink({ children, href }: Params) {
  return <Link href={href}>{children}</Link>;
}
