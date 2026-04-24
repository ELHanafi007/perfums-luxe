"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const categoryMap: { [key: string]: string } = {
    "signature": "Signature",
    "pure-oils": "Pure Oils",
    "limited-edition": "Limited Edition",
    "for-her": "For Her",
    "for-him": "For Him",
    "unisex": "Unisex"
  };

  const categoryName = categoryMap[params.slug];
  
  if (!categoryName) {
    notFound();
  }

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <Section size="xl" className="pt-40">
      <div className="text-center mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-4 block"
        >
          Collection
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif tracking-widest uppercase"
        >
          {categoryName}
        </motion.h1>
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-40 border-y border-dashed border-gray-200">
          <p className="text-luxury-gray font-light italic text-xl">No masterpieces found in this collection.</p>
        </div>
      )}
    </Section>
  );
}
