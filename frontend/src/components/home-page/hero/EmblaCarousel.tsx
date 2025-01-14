"use client";
import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./css/embla.css";

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

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
      </div>
    </section>
  );
};

export default EmblaCarousel;
