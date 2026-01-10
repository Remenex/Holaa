import Image from "next/image";
import HeroInfo from "../hero-info";
import { ModernIcon } from "../modern-icon";

type Props = {
  image: string;
  title: string;
  rate: number;
  duration: string;
  quality: string;
  genre: string[];
  iscenter: boolean;
};

export default function FansyMovie({
  image,
  title,
  rate,
  duration,
  quality,
  iscenter,
}: Props) {
  return (
    <div className="flex flex-col items-center w-full group">
      <div className="relative w-full h-[680px] overflow-hidden rounded-[40px]">
        <Image
          src={image}
          fill={true}
          alt={title}
          className="h-full object-cover transition-transform duration-300 ease-out pointer-events-none"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 ease-out rounded-[40px] flex flex-col justify-end items-center group-hover:opacity-100 select-none ${
            iscenter ? "opacity-100" : ""
          }`}
        >
          <ModernIcon icon="play_arrow" iconSize={50} link="/player/1" />
          <div className="w-full mt-24 mb-10 flex flex-col items-center gap-4 px-8 text-center select-none">
            <h2 className="text-[70px] uppercase">{title}</h2>
            <div className="flex gap-4 mt-6">
              <HeroInfo icon="star" text={rate + ` IMDB`} />
              <HeroInfo icon="schedule" text={duration} />
              <HeroInfo icon="4k" text={quality} />
            </div>
            <div className="mt-2">
              <p className="text-2xl gray-text font-display">
                Lorem ipsum je veoma dobar tekst za testiranje i dobro posluži
                kada treba da se napiše tekst koji...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
