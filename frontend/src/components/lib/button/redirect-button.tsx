"use client";

import type { ButtonActions } from "@/context/actions/types";
import type { ButtonProps } from "./types";
import Button from "./index";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

type Props<T extends keyof ButtonActions> = Omit<
  ButtonProps<T>,
  "actionId" | "actionParams"
> & {
  url: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string | undefined;
};

export default function RedirectButton<T extends keyof ButtonActions>({
  url,
  target,
  rel,
  ...regularProps
}: Props<T>) {
  return (
    <Link href={url} target={target} rel={rel}>
      <Button {...regularProps} actionId={"test"} actionParams={[]} />
    </Link>
  );
}
