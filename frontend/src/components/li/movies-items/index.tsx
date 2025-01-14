import MovieItem from "@/components/lib/movie-item";

interface Movie {
  image: string;
  name: string;
}

const movies: Movie[] = [
  { image: "/images/movie.png", name: "The Shawshank Redemption" },
  { image: "/images/movie-1.png", name: "Inception" },
  { image: "/images/movie-2.png", name: "The Dark Knight" },
  { image: "/images/movie-3.png", name: "Forrest Gump" },
  { image: "/images/movie-4.png", name: "The Godfather" },
  { image: "/images/movie-5.png", name: "Titanic" },
];

export default function MovieItems() {
  return (
    <div className="flex flex-wrap justify-between items-center max-w-[1600px]">
      {movies.map((movie) => (
        <MovieItem key={movie.image} image={movie.image} name={movie.name} />
      ))}
    </div>
  );
}
