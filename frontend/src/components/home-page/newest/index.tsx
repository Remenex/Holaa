import { EmblaOptionsType } from "embla-carousel";
import NewestCarousel from "./carousel";

import LatestMovie from "@/components/lib/movies/latest-movies";
import { Movie } from "../../../app/types/Movie";
import "./css/embla.css";
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
const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const SLIDES = movies.map((movie) => (
  <LatestMovie
    key={movie.title}
    title={movie.title}
    image={movie.image}
    rate={movie.rate}
    duration={movie.duration}
    quality={movie.quality}
    genre={movie.genre}
  />
));

export default function NewestMoviesSlider() {
  return <NewestCarousel slides={SLIDES} options={OPTIONS} />;
}
