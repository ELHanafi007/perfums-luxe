"use client";

import ProductCard from "./ProductCard";
import { Section } from "./ui/Section";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

const categories = ["For Her", "For Him"];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("For Her");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.category === activeCategory);

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
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gold text-[11px] uppercase tracking-[0.4em] font-bold mb-4 block"
          >
            The Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Curated Masterpieces
          </motion.h2>
        </div>
        
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest font-bold border-b border-gray-100 pb-2 w-full md:w-auto">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative pb-1 transition-colors duration-300 ${
                activeCategory === category ? "text-black" : "text-gray-400 hover:text-black"
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-luxury-gray font-light italic">No products found in this category.</p>
        </div>
      )}
    </Section>
  );
}
