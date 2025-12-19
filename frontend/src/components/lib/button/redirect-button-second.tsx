
import Link from "next/link";
import SecondButton from "./second-button";

export type Props = {
  text: string;
  iconImage?: string;
  iconSize?: number;
  className?: string;
  backgroundColor?:string;
  url:string;
  target:string;
} & React.HTMLAttributes<HTMLButtonElement>;


export default function RedirectButtonSecond({
  url,
  target,
  rel,
  backgroundColor,
  ...regularProps
}: Props) {
  return (
    <Link href={url} target={target} rel={rel}>
      <SecondButton
        {...regularProps}
        backgroundColor={backgroundColor}
      />
    </Link>
  );
}
