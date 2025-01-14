import Image from "next/image";
import Link from "next/link";
import Icon from "../icon";

type Props = {
  icon: string;
  iconSize?: number;
  smallPadding?: boolean;
  onclick?: () => void;
  link?: string;
};

export function ModernIcon({ icon, iconSize, smallPadding, onclick, link}: Props) {
  return (
    <Link href={link??""} onClick={onclick}>
      <div className={`relative  flex items-center justify-center ${smallPadding ? `p-2`: `p-5`}`}>
        <Image
          src="/images/gray-circle.svg"
          fill={true}
          alt="Gray Circle"
          className="absolute top-0 left-0"
        />
        <Icon icon={icon} iconSize={iconSize ?? 30} />
      </div>
    </Link>
  );
}
