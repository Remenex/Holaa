import Image from "next/image";
import Link from "next/link";

type Props = {
  reaction: boolean;
  image: string;
  title: string;
  genre: string;
  year: number;
};

export default function ReactionItem({
  reaction,
  image,
  title,
  genre,
  year,
}: Props) {
  return (
    <div className="w-1/6 p-3">
      <div className="relative">
        <div className="relative w-[228px] h-[329px] overflow-hidden rounded-3xl">
          <Image
            src={"/images/" + image}
            alt="movie-image"
            fill={true}
            className="duration-300 hover:scale-110"
          />
        </div>
        <Image
          src={+reaction ? "/icons/positive.svg" : "/icons/negative.svg"}
          alt="reaction-icon"
          width={25}
          height={25}
          className="absolute top-2 left-2"
        />
      </div>
      <Link href="" className="text-xl py-1">{title}</Link>
      <div className=" flex justify-between">
        <p className="text-base gray-text">{genre}</p>
        <p className="text-base gray-text">{year}</p>
      </div>
    </div>
  );
}
