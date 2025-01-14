"use client";

import type { ButtonActions } from "@/context/actions/types";
import type { ButtonProps } from "./types";
import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";
import SecondButton from "./second-button";

type Props<T extends keyof ButtonActions> = Omit<
  ButtonProps<T>,
  "actionId" | "actionParams"
> & {
  url: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string | undefined;
};

export default function RedirectButtonSecond<T extends keyof ButtonActions>({
  url,
  target,
  rel,
  backgroundColor,
  ...regularProps
}: Props<T>) {
  return (
    <Link href={url} target={target} rel={rel}>
      <SecondButton
        {...regularProps}
        actionId={"test"}
        actionParams={[]}
        backgroundColor={backgroundColor}
      />
    </Link>
  );
}
