"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col group"
    >
      <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden bg-luxury-cream">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </Link>
        
        {/* Quick Add Button */}
        <button 
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md py-3 text-[10px] uppercase tracking-[0.2em] font-bold translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2 hover:bg-black hover:text-white"
          aria-label="Add to cart"
        >
          <Plus size={14} />
          Quick Add
        </button>
      </div>
      
      <div className="text-center px-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2 font-bold">
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-serif mb-2 hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-medium tracking-wider text-luxury-black/70">
          ${product.price}.00
        </p>
      </div>
    </motion.div>
  );
}
