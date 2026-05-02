"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col group cursor-pointer"
    >
      <div className="relative aspect-[4/5] w-full mb-8 overflow-hidden bg-luxury-cream">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <motion.div 
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
          
          {/* Elegant Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-[1px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-500 m-4" />
          <div className="absolute top-0 left-0 w-[1px] h-8 bg-gold/0 group-hover:bg-gold/50 transition-all duration-500 m-4" />
          <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-500 m-4" />
          <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-gold/0 group-hover:bg-gold/50 transition-all duration-500 m-4" />
        </Link>
        
        {/* Quick Add - Floating Style */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-black pointer-events-auto shadow-2xl"
            aria-label="Quick Add"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
      
      <div className="text-center">
        <motion.p 
          initial={{ opacity: 0.5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3 font-bold"
        >
          {product.brand}
        </motion.p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-serif mb-3 hover:text-gold transition-colors duration-500 tracking-wide">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-4 bg-gray-200" />
          <p className="text-sm font-light tracking-[0.2em] text-luxury-black/60">
            {product.price}.00 MAD
          </p>
          <div className="h-px w-4 bg-gray-200" />
        </div>
      </div>
    </motion.div>
  );
}
