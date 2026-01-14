"use client";
import FansyMovie from "@/components/lib/movies/fansy-movies";
import { EmblaOptionsType } from "embla-carousel";
import "./css/embla.css";
import FansySliderComponent from "./fansy";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { getTopRatedMovies } from "@/services/movies.service";

const OPTIONS: EmblaOptionsType = { loop: false };

export default function FansySlider() {
  const [slides, setSlides] = useState<ReactNode[]>([]);

  useEffect(() => {
    const handleMovies = async () => {
      try {
        const res = await getTopRatedMovies();
        setSlides(
          res.map((movie) => {
            return (
              <FansyMovie
                id={movie._id}
                key={movie.title}
                title={movie.title}
                image={`http://localhost:8000${movie.thumbnail}`}
                rate={movie.imdb}
                duration={movie.duration}
                quality="Full HD"
                genre={movie.categories}
                iscenter={false}
              />
            );
          })
        );
      } catch (err) {
        toast.error(
          "Doslo je do greske prilikom preuzimanja najboljih filmova"
        );
      }
    };

    handleMovies();
  }, []);

  return <FansySliderComponent slides={slides} options={OPTIONS} />;
}
