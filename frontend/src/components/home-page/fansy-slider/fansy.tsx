"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { usePrevNextButtons } from "./fansy-buttons";
import useEmblaCarousel from "embla-carousel-react";
import { Movie } from "../../../../public/interfaces/Movie";
import FansyMovie from "@/components/lib/movies/fansy-movies";
import Arrow from "@/components/lib/arrow";
const movies = [
  {
    image: "/images/interstellar.png",
    title: "Interstellar",
    rate: 9.9,
    duration: "2h 30min",
    quality: "4k Kvalitet",
    genre: ["Akcija", "Fantazija", "Sci-Fi"],
  } as Movie,
  {
    image: "/images/hangover.png",
    title: "Hangover",
    rate: 8.0,
    duration: "2h 10min",
    quality: "4k Kvalitet",
    genre: ["Porodicni", "Komedija"],
  } as Movie,
  {
    image: "/images/interstellar.png",
    title: "Interstellar2",
    rate: 9.9,
    duration: "2h 30min",
    quality: "4k Kvalitet",
    genre: ["Akcija", "Fantazija", "Sci-Fi"],
  } as Movie,
  {
    image: "/images/woman.png",
    title: "Hangover2",
    rate: 8.0,
    duration: "2h 10min",
    quality: "4k Kvalitet",
    genre: ["Porodicni", "Komedija"],
  } as Movie,
  {
    image: "/images/rocket.png",
    title: "Interstellar",
    rate: 9.9,
    duration: "2h 30min",
    quality: "4k Kvalitet",
    genre: ["Akcija", "Fantazija", "Sci-Fi"],
  } as Movie,
  {
    image: "/images/hulk.png",
    title: "Hangover",
    rate: 8.0,
    duration: "2h 10min",
    quality: "4k Kvalitet",
    genre: ["Porodicni", "Komedija"],
  } as Movie,
  {
    image: "/images/spiderman.png",
    title: "Interstellar2",
    rate: 9.9,
    duration: "2h 30min",
    quality: "4k Kvalitet",
    genre: ["Akcija", "Fantazija", "Sci-Fi"],
  } as Movie,
  {
    image: "/images/hangover.png",
    title: "Hangover2",
    rate: 8.0,
    duration: "2h 10min",
    quality: "4k Kvalitet",
    genre: ["Porodicni", "Komedija"],
  } as Movie,
];

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const FansySliderComponent: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, []);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap() + 1);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateSelectedIndex);
    updateSelectedIndex();
  }, [emblaApi, updateSelectedIndex]);

  const {
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full flex justify-center bg-dark-gray mt-[150px] pt-32 pb-16">
      <div className="fansySliderSection fansy-embla w-full">
        <div className="fansy-embla__viewport" ref={emblaRef}>
          <div className="fansy-embla__container">
            {slides.map((element, index) => {
              const isCenter = index === selectedIndex;
              const isLeft = index === selectedIndex - 1;
              const isRight = index === selectedIndex + 1;

              let slideClass = "fansy-embla__slide";

              if (isCenter) slideClass += " no-rotate";
              else if (isLeft) slideClass += " rotate-left";
              else if (isRight) slideClass += " rotate-right";
              else slideClass += " dimmed";

              return (
                <div className={slideClass} key={index}>
                  <FansyMovie
                    key={movies[index].title}
                    title={movies[index].title}
                    image={movies[index].image}
                    rate={movies[index].rate}
                    duration={movies[index].duration}
                    quality={movies[index].quality}
                    genre={movies[index].genre}
                    iscenter={isCenter}
                  />
                </div>
              );
            })}
          </div>
        </div>
          <div className="flex gap-4 w-full justify-center">
            <Arrow size={80} onclick={onPrevButtonClick}/>
            <Arrow size={80} isLeft={true}  onclick={onNextButtonClick}/>
          </div>
      </div>
    </section>
  );
};

export default FansySliderComponent;
