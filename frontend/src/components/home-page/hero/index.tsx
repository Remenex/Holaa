import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";
import { ReactNode } from "react";
import HeroSlide from "./slide";

const OPTIONS: EmblaOptionsType = { loop: false };
const SLIDES: Array<ReactNode> = [<HeroSlide/>, <HeroSlide/>, <HeroSlide/>];

export default function HeroSlider() {
  // SLIDES.push(<Header />);

  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
