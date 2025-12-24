import Image from "next/image";
import { Movie } from "../../../app/types/Movie";
import Icon from "../icon";
import { ModernIcon } from "../modern-icon";

export default function BestMovieWidget({
  image,
  title,
  rate,
  duration,
  quality,
  genre,
}: Movie) {
  return (
    <div className="flex flex-col items-center max-w-[355px]">
      {/* Slika sa efektima */}
      <div className="relative group w-full h-[370px] overflow-hidden rounded-[40px] border-[5px] border-white">
        <Image
          src={image}
          width={355}
          height={370}
          alt={title}
          className="h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-[40px] flex justify-center items-center">
          <ModernIcon icon="play_arrow" iconSize={40} />
        </div>
      </div>

      {/* Ostali podaci */}
      <h2 className="mt-5">{title}</h2>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center mt-2">
          <Icon icon="kid_star" variation="text-yellow-600" />
          <p className="font-bold ml-1 text-lg">{rate} IMDB</p>
        </div>
        <div className="flex items-center mt-2">
          <Icon icon="schedule" variation="text-white" />
          <p className="font-bold ml-1 text-lg">{duration}</p>
        </div>
        <div className="flex items-center mt-2">
          <Icon icon="4k" variation="text-white" />
          <p className="font-bold ml-1 text-lg">{quality}</p>
        </div>
      </div>
      <p className="gray-text text-lg mt-2">
        {genre.map((element) => element + ", ")}
      </p>
    </div>
  );
}
