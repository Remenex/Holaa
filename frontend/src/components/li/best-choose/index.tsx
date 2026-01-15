import Button from "@/components/lib/button";
import BestMovieWidget from "@/components/lib/movies/best-movies";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function BestChoose() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  let movies: Movie[];

  if (!token)
    movies = [
      {
        _id: "1",
        title: "Interstellar",
        imdb: 9.9,
        duration: "2h 30min",
        description: "Sci-fi ep o putovanju kroz svemir i vrijeme.",
        thumbnail: "/images/interstellar.png",
        mainCharacterImage: "/images/interstellar-main.png",
        trailer: "/trailers/interstellar.mp4",
        video: "/videos/interstellar.mp4",
        ownerId: "user123",
        categories: [
          { _id: "c1", name: "Akcija" },
          { _id: "c2", name: "Fantazija" },
          { _id: "c3", name: "Sci-Fi" },
        ],
      },
      {
        _id: "2",
        title: "Hangover",
        imdb: 8.0,
        duration: "2h 10min",
        description: "Komedija o nezaboravnoj momačkoj večeri.",
        thumbnail: "/images/hangover.png",
        mainCharacterImage: "/images/hangover-main.png",
        trailer: "/trailers/hangover.mp4",
        video: "/videos/hangover.mp4",
        ownerId: "user123",
        categories: [
          { _id: "c4", name: "Porodični" },
          { _id: "c5", name: "Komedija" },
        ],
      },
      {
        _id: "3",
        title: "Interstellar 2",
        imdb: 9.8,
        duration: "2h 35min",
        description: "Nastavak epske svemirske avanture.",
        thumbnail: "/images/interstellar.png",
        mainCharacterImage: "/images/interstellar2-main.png",
        trailer: "/trailers/interstellar2.mp4",
        video: "/videos/interstellar2.mp4",
        ownerId: "user123",
        categories: [
          { _id: "c1", name: "Akcija" },
          { _id: "c3", name: "Sci-Fi" },
        ],
      },
      {
        _id: "4",
        title: "Hangover 2",
        imdb: 7.9,
        duration: "2h 15min",
        description: "Još luđa avantura stare ekipe.",
        thumbnail: "/images/hangover.png",
        mainCharacterImage: "/images/hangover2-main.png",
        trailer: "/trailers/hangover2.mp4",
        video: "/videos/hangover2.mp4",
        ownerId: "user123",
        categories: [
          { _id: "c4", name: "Porodični" },
          { _id: "c5", name: "Komedija" },
        ],
      },
    ];
  else {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/movies/friends/watched",
      {
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    movies = await res.json();
  }

  if (!movies || movies.length === 0) return null;

  return (
    <section className="bestChoose w-full relative -top-[50px]">
      <div className="w-full flex justify-center">
        <div className="w-full main-conainer bg-dark-gray py-16 px-20 max-w-[1720px] rounded-[50px] relative">
          <h2 className="mb-12">Filmovi koje su gledali tvoji prijatelji</h2>

          <div
            className={`flex justify-between transition-all duration-300 ${
              !token ? "blur-lg pointer-events-none select-none" : ""
            }`}
          >
            {movies &&
              movies.length > 0 &&
              movies.map((movie) => (
                <BestMovieWidget key={movie._id} movie={movie} token={token} />
              ))}
          </div>

          {!token && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 bg-black/70 backdrop-blur-md px-10 py-8 rounded-3xl text-center max-w-xl">
                <h3 className="text-3xl mb-3">
                  Prijavi se i otkrij šta tvoji prijatelji gledaju
                </h3>
                <p className="gray-text text-lg">
                  Poveži se sa ekipom, istraži njihove izbore i pronađi savršen
                  film za sledeće veče.
                </p>
                <Link href="/login">
                  <Button
                    iconImage="login"
                    text="Prijavi se"
                    className="w-fit"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
