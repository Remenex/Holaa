import Arrow from "@/components/lib/arrow";
import Image from "next/image";

type Props = {
  image: string;
  genre: string;
  isReverse: boolean;
};

export default function CategoryWidget({ image, genre, isReverse }: Props) {
  return (
    <div className={`w-[320px] h-[330px] rounded-[15px] bg-dark-gray p-4 flex justify-between ${isReverse ? `flex-col-reverse` : `flex-col`}`}>
      <div className="w-full h-[240px] relative">
        <Image
          fill={true}
          src={image}
          alt={genre}
          className="rounded-[15px] object-cover w-full h-full"
        />
      </div>
      <div className="w-full flex justify-between">
        <h2 className="uppercase">{genre}</h2>
        <Arrow size={40} isLeft={true}/>
      </div>
    </div>
  );
}
