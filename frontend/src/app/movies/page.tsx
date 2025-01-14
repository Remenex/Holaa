"use client";
import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import MovieItems from "@/components/li/movies-items";
import BgImageOverlay from "@/components/lib/bg-image";
import { Search } from "@/components/ui/search";

const placeholders = [
  "Pretraži svoj omiljeni film...",
  "Koji je najbolje ocenjeni film svih vremena?",
  "Pronađi filmove koje je režirao Kristofer Nolan...",
  "Unesi žanr: Akcija, Komedija, Drama...",
  "Tražiš klasike poput Kuma?",
];

export default function MoviesPage() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="w-full">
      <Header />
      <BgImageOverlay bigTitle="FILMOVI" linkTitle="LISTA FILMOVA" />
      <div className="mt-24 mb-12">
        <Search
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <section className="movies w-full flex justify-center">
        <MovieItems />
      </section>
      <Footer />
    </div>
  );
}
