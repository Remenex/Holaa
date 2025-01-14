import Image from "next/image";
import { Movie } from "../../../../public/interfaces/Movie";
import Icon from "../icon";
import { ModernIcon } from "../modern-icon";

export default function LatestMovie({
  image,
  title,
  rate,
  duration,
  quality,
  genre,
}: Movie) {
  return (
    <div className="w-full max-w-[320px] h-[370px] rounded-[30px] cursor-pointer group relative">
      <Image
        src={image}
        fill={true}
        alt={title}
        className="h-full object-cover rounded-[30px] pointer-events-none"
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-100 rounded-[30px] shadow-lg
        opacity-0 scale-75 w-[115%] h-[115%] group-hover:opacity-100 group-hover:scale-100 group-hover:z-100 transition-all duration-300 ease-out"
      >
        <div className="relative w-full h-full">
          <Image
            src={image}
            fill={true}
            alt={title}
            className="h-full object-cover rounded-[30px] absolute top-0 pointer-events-none"
          />

          <div className="w-full h-full bg-black bg-opacity-60 absolute top-0 left-0 rounded-[20px]"></div>

          <div className="w-full absolute h-full top-0 px-4 py-8 flex flex-col justify-between">
            <div className="flex justify-center items-center w-full h-full">
                <ModernIcon icon="play_arrow" iconSize={40} link="/player"/>
            </div>

            <div className="select-none">
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
          </div>
        </div>
      </div>
    </div>
  );
}
