import Image from "next/image";

type Props = {
  isLeft?: boolean;
  size: number;
  onclick?: () => void;
};

export default function Arrow({ isLeft = false, size, onclick }: Props) {
  return (
    <div
      className="rounded-[50%] border-2 border-white flex justify-center items-center duration-300 cursor-pointer hover:main-gradient"
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={onclick}
    >
      <Image
        src="/icons/arrow.svg"
        width={size - 10}
        height={size - 10}
        alt="Arrow"
        className={!isLeft ? `mr-3 rotate-[180deg]` : `ml-3`}
      />
    </div>
  );
}
