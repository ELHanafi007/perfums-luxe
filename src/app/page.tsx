import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Collections from "@/components/Collections";
import Newsletter from "@/components/Newsletter";
import Philosophy from "@/components/Philosophy";
import Experience from "@/components/Experience";
import FragranceFinder from "@/components/FragranceFinder";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Marquee />
      <Experience />
      <FragranceFinder />
      <ProductGrid />
      <Philosophy />
      <Newsletter />
    </>
  );
}
