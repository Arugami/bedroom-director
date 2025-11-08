import Hero from "@/components/home/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedTools from "@/components/home/FeaturedTools";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedTools />
      <AboutSection />
    </>
  );
}
