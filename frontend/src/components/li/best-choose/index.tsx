import BestMovieWidget from "@/components/lib/movies/best-movies";
import { Movie } from "../../../app/types/Movie";

export default function BestChoose() {
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
      image: "/images/hangover.png",
      title: "Hangover2",
      rate: 8.0,
      duration: "2h 10min",
      quality: "4k Kvalitet",
      genre: ["Porodicni", "Komedija"],
    } as Movie,
  ];

  return (
    <section className="bestChoose w-full relative -top-[50px]">
      <div className="w-full flex justify-center">
        <div className="w-full main-conainer bg-dark-gray py-16 px-20 max-w-[1720px] rounded-[50px] flex justify-between">
          {movies.map((movie) => (
            <BestMovieWidget
              key={movie.title}
              title={movie.title}
              image={movie.image}
              rate={movie.rate}
              duration={movie.duration}
              quality={movie.quality}
              genre={movie.genre}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
