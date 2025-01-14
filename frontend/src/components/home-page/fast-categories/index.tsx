import CategoryWidget from "./category-card";
import RedirectButtonSecond from "@/components/lib/button/redirect-button-second";

interface fastMovie {
  image: string;
  genre: string;
}

const movies = [
  {
    image: "/images/rocket.png",
    genre: "akcioni",
  } as fastMovie,
  {
    image: "/images/rocket.png",
    genre: "akcioni",
  } as fastMovie,
  {
    image: "/images/interstellar.png",
    genre: "akcioni",
  } as fastMovie,
  {
    image: "/images/rocket.png",
    genre: "akcioni",
  } as fastMovie,
  {
    image: "/images/rocket.png",
    genre: "akcioni",
  } as fastMovie,
];

export default function FastCategories() {
  return (
    <section className="fastCategories w-full flex flex-col items-center mt-[150px]">
      <div className="flex items-center main-container justify-center relative w-full max-w-[1720px]">
        <h2 className="text-5xl text-center">PRETRAZI PO KATEGORIJI</h2>
        <div className="absolute right-[20px]">
            <RedirectButtonSecond text="PRIKAZI JOS" url="/categories"/>
        </div>
      </div>
      <div className="w-full flex justify-center mt-[50px]">
        <div className="w-full main-container flex justify-between max-w-[1720px]">
          <div className="w-full max-w-[1720px] flex justify-between items-center">
            {movies.map((element, index) => {
              return (
                <CategoryWidget
                  key={index}
                  image={element.image}
                  genre={element.genre}
                  isReverse={index % 2 !== 0}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
