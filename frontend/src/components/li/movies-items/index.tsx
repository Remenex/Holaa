"use client";
import MovieItem from "@/components/lib/movie-item";
import { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
}

export default function MovieItems() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/movies")
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center max-w-[1600px] gap-4">
      {movies.map((movie) => (
        <MovieItem
          key={movie._id}
          image={`http://localhost:8000${movie.thumbnail}`}
          name={movie.title}
        />
      ))}
    </div>
  );
}
