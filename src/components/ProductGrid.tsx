"use client";

import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Section } from "./ui/Section";
import { motion } from "framer-motion";

export default function ProductGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Section id="shop" size="lg">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-gold text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block">
            The Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif">Curated Masterpieces</h2>
        </div>
        <div className="flex gap-8 text-[11px] uppercase tracking-widest font-bold">
          <button className="border-b-2 border-black pb-1">All</button>
          <button className="text-gray-400 hover:text-black transition-colors pb-1">For Him</button>
          <button className="text-gray-400 hover:text-black transition-colors pb-1">For Her</button>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </Section>
  );
}
