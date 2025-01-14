import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
};

export default function Logo({ width = 100, height = 100 }: Props) {
  return (
    <Image
      className="cursor-pointer"
      src="/images/logo.svg"
      alt="Holaa Logo"
      width={width}
      height={height}
    />
  );
}
