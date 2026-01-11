"use client";
import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import MovieItems from "@/components/li/movies-items";
import BgImageOverlay from "@/components/lib/bg-image";
import { Search } from "@/components/ui/search";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const placeholders = [
  "Pretraži svoj omiljeni film...",
  "Koji je najbolje ocenjeni film svih vremena?",
  "Pronađi filmove koje je režirao Kristofer Nolan...",
  "Unesi žanr: Akcija, Komedija, Drama...",
  "Tražiš klasike poput Kuma?",
];

export interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
}

export default function MoviesPage() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/movies`)
      .then((res) => res.json())
      .then((data: Movie[]) => {
        setAllMovies(data);
        setFilteredMovies(data);
      });
  }, []);

  useEffect(() => {
    const value = searchValue.toLowerCase().trim();

    if (!value) {
      setFilteredMovies(allMovies);
      return;
    }

    setFilteredMovies(
      allMovies.filter((movie) => movie.title.toLowerCase().includes(value))
    );
  }, [searchValue, allMovies]);

  return (
    <div className="w-full">
      <Header />
      <BgImageOverlay bigTitle="FILMOVI" linkTitle="LISTA FILMOVA" />

      <div className="mt-24 mb-12">
        <Search
          placeholders={placeholders}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
        />
      </div>

      <section className="movies w-full flex justify-center">
        <MovieItems movies={filteredMovies} />
      </section>

      <Footer />
    </div>
  );
}
