"use client";

import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";
import Button from "./index";

export type Props = {
  text: string;
  iconImage?: string;
  iconSize?: number;
  className?: string;
  backgroundColor?: string;
  iconMargin: string;
  url: string;
  target?: HTMLAttributeAnchorTarget;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function RedirectButton({
  url,
  target,
  rel,
  iconMargin,
  ...regularProps
}: Props) {
  return (
    <Link href={url} target={target} rel={rel}>
      <Button className={`m-${iconMargin}`} {...regularProps} />
    </Link>
  );
}
