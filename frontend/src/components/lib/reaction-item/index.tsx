import Image from "next/image";
import Link from "next/link";

type Props = {
  reaction: Reaction;
};

export default function ReactionItem({
  reaction,
}: // genre,
// year,
Props) {
  return (
    <div className="w-fit p-3">
      <div className="relative">
        <div className="relative w-[228px] h-[329px] overflow-hidden rounded-3xl">
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + reaction.movie.thumbnail}
            alt="movie-image"
            fill={true}
            className="duration-300 hover:scale-110"
          />
        </div>
        <Image
          src={
            reaction.type === "LIKE"
              ? "/icons/positive.svg"
              : "/icons/negative.svg"
          }
          alt="reaction-icon"
          width={25}
          height={25}
          className="absolute top-2 left-2"
        />
      </div>
      <Link href={"/player/" + reaction.movie._id} className="text-xl py-1">
        {reaction.movie.title}
      </Link>
      <div className=" flex justify-between">
        {/* <p className="text-base gray-text">
          {reaction.movie.categories.map((c) => c.name).join(", ")}
        </p> */}
        {/* <p className="text-base gray-text">{reaction.movie.year}</p> */}
      </div>
    </div>
  );
}
