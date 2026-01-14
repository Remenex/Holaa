import Arrow from "@/components/lib/arrow";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image: string;
  genre: string;
  isReverse: boolean;
};

export default function CategoryWidget({ id, image, genre, isReverse }: Props) {
  return (
    <Link
      href={`/movies?category=${id}`}
      className={`w-[320px] h-[330px] rounded-[15px] bg-dark-gray p-4 flex justify-between ${
        isReverse ? `flex-col-reverse` : `flex-col`
      }`}
    >
      <div className="w-full h-[240px] relative">
        <Image
          fill={true}
          src={image}
          alt={genre}
          className="rounded-[15px] object-cover w-full h-full"
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <h2 className="uppercase">{genre}</h2>
        <Arrow size={40} isLeft={true} />
      </div>
    </Link>
  );
}
