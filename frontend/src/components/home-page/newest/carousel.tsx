"use client";
import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "./carousel-buttons";
import Image from "next/image";
import Arrow from "@/components/lib/arrow";

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const NewestCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="newest_embla w-full">
      <div className="w-full flex justify-center">
        <div className="w-full main-container flex justify-between max-w-[1720px]">
          <div className="flex items-center">
            <h2 className="text-5xl">POSLEDNJE DODATO</h2>
            <Image
              src="/icons/just-arrow.svg"
              width={35}
              height={35}
              alt="Arrow Right"
              className="ml-5"
            />
          </div>

          <div className="flex gap-4">
            <Arrow size={60} onclick={onPrevButtonClick}/>
            <Arrow size={60} isLeft={true}  onclick={onNextButtonClick}/>
          </div>
        </div>
      </div>
      <div className="newest_embla__viewport mt-2" ref={emblaRef}>
        <div className="newest_embla__container py-10">
          {slides.map((node, index) => (
            <div className="newest_embla__slide" key={index}>
                {node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewestCarousel;
