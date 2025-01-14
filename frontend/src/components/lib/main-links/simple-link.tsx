import Image from "next/image";
import Link from "next/link";
import Icon from "../icon";

type Props = {
  icon: string;
  title: string;
  url: string;
};

export default function SimpleLink({ icon, title, url }: Props) {
  return (
    <Link href={url}>
      <div className="relative w-[70px] h-[70px] flex items-center justify-center group">
        <Image
          src="/images/gray-circle.svg"
          width={70}
          height={70}
          alt="Home"
          className="absolute top-0 left-0"
        />
        <Icon icon={icon} iconSize={35} variation="text-white" />

        <div
          className="w-[70px] h-full bg-[#ededed] bg-opacity-30 absolute top-0 right-0 rounded-[50px] border-0 flex items-center
          overflow-hidden transition-all duration-300 ease-in-out group-hover:w-[200px] group-hover:border-[#ff581c] group-hover:border-4"
        >
          <p className="text-3xl font-display ml-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}
