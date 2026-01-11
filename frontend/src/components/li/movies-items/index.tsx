"use client";
import MovieItem from "@/components/lib/movie-item";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
}

export default function MovieItems() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center max-w-[1600px] gap-4">
      {movies.map((movie) => (
        <MovieItem
          key={movie._id}
          image={`${API_URL}${movie.thumbnail}`}
          name={movie.title}
        />
      ))}
    </div>
  );
}
