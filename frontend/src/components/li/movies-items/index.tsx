"use client";
import MovieItem from "@/components/lib/movie-item";
import { Movie } from "@/app/movies/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MovieItems({ movies }: { movies: Movie[] }) {
  if (!movies.length) {
    return (
      <p className="text-gray-400 text-xl mt-12">
        Nema rezultata za uneti pojam 😕
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 max-w-[1600px] w-full">
      {movies.map((movie) => (
        <MovieItem
          key={movie._id}
          _id={movie._id}
          image={`${API_URL}${movie.thumbnail}`}
          name={movie.title}
        />
      ))}
    </div>
  );
}
