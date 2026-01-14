"use client";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";
import { ReactNode, useEffect, useState } from "react";
import HeroSlide from "./slide";
import { toast } from "sonner";
import { getAbstractMovies } from "@/services/movies.service";

const OPTIONS: EmblaOptionsType = { loop: false };

export default function HeroSlider() {
  const [slides, setSlides] = useState<ReactNode[]>([]);

  useEffect(() => {
    const handleSlides = async () => {
      try {
        const res = await getAbstractMovies();

        setSlides(
          res.map((movie, index) => {
            return (
              <HeroSlide key={movie._id} movie={movie} count={index + 1} />
            );
          })
        );
      } catch (err) {
        toast.error(
          "Doslo je do greske prilikom preuzimanja abstraktnih filmova"
        );
      }
    };
    handleSlides();
  }, []);
  return (
    <div className="relative">
      <EmblaCarousel slides={slides} options={OPTIONS} />
    </div>
  );
}
