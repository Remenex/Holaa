import Image from "next/image";
import HeroInfo from "../../lib/hero-info";
import RedirectButton from "../../lib/button/redirect-button";
import RedirectButtonSecond from "../../lib/button/redirect-button-second";

type Props = {
  count: number;
  movie: Movie;
};

export default function HeroSlide({ count, movie }: Props) {
  return (
    <div className="w-full h-[1000px] hero-dark relative flex justify-center cursor-grab ">
      <div className="w-full h-full max-w-[1920px] relative flex justify-center">
        <div
          className={`h-full w-[500px] ${
            count === 1
              ? "first-slide-gradient"
              : count === 2
              ? "second-slide-gradient"
              : ""
          } absolute top-0 left-0`}
        ></div>
        <div className="absolute top-0 w-full h-full flex max-w-[1720px] items-end justify-between">
          <div className="flex items-end">
            <div className="w-32 mb-24">
              <div>
                <h2 className="text-7xl">
                  {`0${count}`}
                  <span className="text-3xl opacity-20"> / 03</span>
                </h2>
              </div>
              <p className="rotate-90 text-2xl mt-[180px] -ml-[100px]">
                Skrolaj Dole
              </p>
              <Image
                src="/icons/arrow.svg"
                width={100}
                height={50}
                alt="Arrow"
                className="rotate-90 mt-[30px] -ml-[35px] pointer-events-none"
              />
            </div>
            <div>
              <Image
                src={`http://localhost:8000${movie.mainCharacterImage}`}
                width={667}
                height={976}
                alt="Women"
                className="pointer-events-none"
              />
            </div>
          </div>
          <div className="flex items-center h-full pr-64">
            <div className="h-full flex flex-col justify-center max-w-[600px] ">
              <h1 className="text-[150px] font-extrabold select-none">
                {movie.title.toUpperCase()}
              </h1>
              <div className="flex gap-4 mt-6">
                <HeroInfo icon="star" text={`${movie.imdb} IMDB`} />
                <HeroInfo icon="schedule" text={movie.duration} />
                <HeroInfo icon="4k" text="4k Kvalitet" />
              </div>

              <div className="mt-6">
                <p className="text-2xl gray-text font-display">
                  {movie.description}
                </p>
              </div>

              <div className="mt-6 flex gap-6">
                <RedirectButton
                  text="GLEDAJ ODMAH"
                  iconImage="play_arrow"
                  url={`/player/${movie._id}`}
                  iconSize={30}
                  iconMargin=""
                />
                <RedirectButtonSecond
                  text="TRILER"
                  url={`http://localhost:8000${movie.trailer}`}
                  iconImage="docs_add_on"
                  iconSize={30}
                  backgroundColor="hero-dark"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
