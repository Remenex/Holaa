import FansyMovie from "@/components/lib/movies/fansy-movies";
import { EmblaOptionsType } from "embla-carousel";
import { Movie } from "../../../app/types/Movie";
import "./css/embla.css";
import FansySliderComponent from "./fansy";

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
const SLIDES = movies.map((movie) => (
  <FansyMovie
    key={movie.title}
    title={movie.title}
    image={movie.image}
    rate={movie.rate}
    duration={movie.duration}
    quality={movie.quality}
    genre={movie.genre}
    iscenter={false}
  />
));

const OPTIONS: EmblaOptionsType = { loop: false };

export default function FansySlider() {
  return <FansySliderComponent slides={SLIDES} options={OPTIONS} />;
}
