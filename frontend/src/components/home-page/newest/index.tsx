"use client";
import { EmblaOptionsType } from "embla-carousel";
import NewestCarousel from "./carousel";

import LatestMovie from "@/components/lib/movies/latest-movies";
import "./css/embla.css";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { getLatestMovies } from "@/services/movies.service";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
export default function NewestMoviesSlider() {
  const [slides, setSlides] = useState<ReactNode[]>([]);

  useEffect(() => {
    const handleMovies = async () => {
      try {
        const res = await getLatestMovies();
        setSlides(
          res.map((movie) => {
            return (
              <LatestMovie
                _id={movie._id}
                key={movie.title}
                title={movie.title}
                thumbnail={`http://localhost:8000${movie.thumbnail}`}
                imdb={movie.imdb}
                duration={movie.duration}
                categories={movie.categories}
              />
            );
          })
        );
      } catch (err) {
        toast.error(
          "Doslo je do greske prilikom prihvatanja najnovijih filmova"
        );
      }
    };
    handleMovies();
  }, []);
  return <NewestCarousel slides={slides} options={OPTIONS} />;
}
