import Hero from "@/components/home/Hero";
import TrendingCreations from "@/components/home/TrendingCreations";
import BrandsUsingAI from "@/components/home/BrandsUsingAI";
import LatestDrops from "@/components/home/LatestDrops";
import FeaturedTools from "@/components/home/FeaturedTools";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingCreations />
      <BrandsUsingAI />
      <LatestDrops />
      <FeaturedTools />
      <AboutSection />
    </>
  );
}
