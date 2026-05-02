"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.notes.some(n => n.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-white flex flex-col"
        >
          {/* Header */}
          <div className="p-8 md:p-12 flex justify-between items-center border-b border-gray-100">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold">Search Our Archives</span>
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center hover:rotate-90 transition-transform duration-500"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Input Area */}
          <div className="max-w-5xl mx-auto w-full px-8 pt-20 md:pt-32">
            <div className="relative group">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gold transition-colors" size={32} strokeWidth={1} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for scents, notes, or collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b border-gray-100 py-8 pl-16 text-3xl md:text-5xl font-serif focus:outline-none focus:border-gold transition-all placeholder:text-gray-100 italic"
              />
            </div>

            {/* Results Area */}
            <div className="mt-20">
              <AnimatePresence>
                {results.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                  >
                    {results.map((product) => (
                      <Link 
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex gap-8 group pb-8 border-b border-gray-50"
                      >
                        <div className="relative w-32 h-40 bg-luxury-cream overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold mb-2">{product.brand}</span>
                          <h3 className="text-2xl font-serif mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
                          <p className="text-sm font-light text-luxury-gray mb-4">{product.price}.00 MAD</p>
                          <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
                            View Details <ArrowRight size={12} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                ) : query.trim().length > 1 ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-serif italic text-luxury-gray text-center py-20"
                  >
                    No matches found for your search.
                  </motion.p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-300 mb-6">Trending</h4>
                      <ul className="space-y-4 text-sm font-medium uppercase tracking-widest">
                        <li className="cursor-pointer hover:text-gold transition-colors" onClick={() => setQuery("Oud")}>Golden Oud</li>
                        <li className="cursor-pointer hover:text-gold transition-colors" onClick={() => setQuery("Rose")}>Desert Rose</li>
                        <li className="cursor-pointer hover:text-gold transition-colors" onClick={() => setQuery("Signature")}>Signature</li>
                      </ul>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
