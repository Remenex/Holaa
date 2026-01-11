"use client";
import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./css/embla.css";
import MainHeader from "@/components/li/main-header";

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((SlideComponent, index) => (
            <div className="embla__slide" key={index}>
              {SlideComponent}
            </div>
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="ml-16">
            <MainHeader />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
