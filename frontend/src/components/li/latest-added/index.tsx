import NewestMoviesSlider from "@/components/home-page/newest";

export default function LatestAddedMovies() {
  
  return (
    <section className="LatestAddedMovies w-full mt-40">
      <div className="w-full flex flex-col items-center">
        
        <div className="w-full">
          <NewestMoviesSlider />
        </div>
      </div>
    </section>
  );
}
