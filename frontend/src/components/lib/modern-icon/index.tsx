import Image from "next/image";
import Link from "next/link";
import Icon from "../icon";

type Props = {
  icon: string;
  iconSize?: number;
  smallPadding?: boolean;
  onclick?: () => void;
  link?: string;
  filled?: boolean;
  iconColor?: string;
};

export function ModernIcon({
  icon,
  iconSize,
  smallPadding,
  onclick,
  link,
  filled,
  iconColor,
}: Props) {
  return (
    <Link href={link ?? ""} onClick={onclick}>
      <div
        className={`relative flex items-center justify-center ${
          smallPadding ? `p-2` : `p-5`
        }`}
      >
        <Image
          src="/images/gray-circle.svg"
          fill={true}
          alt="Gray Circle"
          className="absolute top-0 left-0"
        />
        <Icon
          icon={icon}
          filled={filled}
          iconSize={iconSize ?? 30}
          color={iconColor}
        />
      </div>
    </Link>
  );
}
