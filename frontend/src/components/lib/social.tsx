import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="flex mt-5 gap-2">
      <Link href="https://www.instagram.com/djordje.ivanovic">
        <div className="w-14 h-14 rounded-[28px] social-gradient flex items-center justify-center">
          <Image
            src="/icons/instagram.svg"
            width={25}
            height={25}
            alt="Instagram Logo"
          />
        </div>
      </Link>
      <Link href="https://www.instagram.com/djordje.ivanovic">
        <div className="w-14 h-14 rounded-[28px] social-gradient flex items-center justify-center">
          <Image
            src="/icons/linkedin.svg"
            width={25}
            height={25}
            alt="Instagram Logo"
          />
        </div>
      </Link>
      <Link href="https://www.instagram.com/djordje.ivanovic">
        <div className="w-14 h-14 rounded-[28px] social-gradient flex items-center justify-center">
          <Image
            src="/icons/github.svg"
            width={25}
            height={25}
            alt="Instagram Logo"
          />
        </div>
      </Link>
    </div>
  );
}
