import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Collections from "@/components/Collections";
import Experience from "@/components/Experience";
import Philosophy from "@/components/Philosophy";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <ProductGrid />
      <Experience />
      <Philosophy />
    </>
  );
}
