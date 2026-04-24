import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Collections from "@/components/Collections";
import Newsletter from "@/components/Newsletter";
import Philosophy from "@/components/Philosophy";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <ProductGrid />
      <Philosophy />
      <Newsletter />
    </>
  );
}
