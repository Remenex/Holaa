import Image from "next/image";

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
        <Image
          src={"/images/" + image}
          alt="movie-image"
          width={228}
          height={359}
        />
        <Image
          src={+reaction ? "/icons/positive.svg" : "/icons/negative.svg"}
          alt="reaction-icon"
          width={25}
          height={25}
          className="absolute top-2 left-2"
        />
      </div>
      <p className="text-xl py-1">{title}</p>
      <div className=" flex justify-between">
        <p className="text-base gray-text">{genre}</p>
        <p className="text-base gray-text">{year}</p>
      </div>
    </div>
  );
}
