"use client";
import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import MovieItems from "@/components/li/movies-items";
import BgImageOverlay from "@/components/lib/bg-image";
import { Search } from "@/components/ui/search";
import { getMovies, getMoviesByCategory } from "@/services/movies.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const placeholders = [
  "Pretraži svoj omiljeni film...",
  "Koji je najbolje ocenjeni film svih vremena?",
  "Pronađi filmove koje je režirao Kristofer Nolan...",
  "Unesi žanr: Akcija, Komedija, Drama...",
  "Tražiš klasike poput Kuma?",
];

export default function MoviesPage() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
      const handleMovieCategories = async () => {
        try {
          const res = await getMoviesByCategory(categoryParam);
          setAllMovies(res);
        } catch (err) {
          toast.error("Doslo je do greske prilikom preuzimanja filmova");
        }
      };
      handleMovieCategories();
    } else {
      const handleMovies = async () => {
        try {
          const res = await getMovies();
          setAllMovies(res);
        } catch (err) {
          toast.error("Doslo je do greske prilikom preuzimanja filmova");
        }
      };
      handleMovies();
    }
  }, [categoryParam]);

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
        {filteredMovies.length > 0 ? (
          <MovieItems movies={filteredMovies} />
        ) : (
          <h2>Nije pronadjen nijedan rezultat</h2>
        )}
      </section>

      <Footer />
    </div>
  );
}
