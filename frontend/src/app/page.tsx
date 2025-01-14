import FansySlider from "@/components/home-page/fansy-slider";
import FastCategories from "@/components/home-page/fast-categories";
import HeroSlider from "@/components/home-page/hero";
import BestChoose from "@/components/li/best-choose";
import Footer from "@/components/li/footer";
import { IndexHeader } from "@/components/li/index-header";
import LatestAddedMovies from "@/components/li/latest-added";

export default function Index() {
  return (
    <div className="w-full">
      <IndexHeader />
      <HeroSlider />
      <BestChoose />
      <LatestAddedMovies />
      <FansySlider/>
      <FastCategories/>
      <Footer/>
    </div>
  );
}
