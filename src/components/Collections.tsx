"use client";

import Link from "next/link";
import Image from "next/image";
import { Section } from "./ui/Section";
import { motion } from "framer-motion";

const collections = [
  {
    name: "Signature",
    description: "Our timeless masterpieces",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
    href: "/collections/signature"
  },
  {
    name: "Pure Oils",
    description: "Concentrated luxury",
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&q=80&w=800",
    href: "/collections/pure-oils"
  },
  {
    name: "Limited Edition",
    description: "Rare and exclusive",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=800",
    href: "/collections/limited-edition"
  }
];

export default function Collections() {
  return (
    <Section id="collections" className="bg-luxury-cream/50" size="xl">
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-4 block"
        >
          Curated selection
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif uppercase tracking-widest"
        >
          The Collections
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              href={collection.href}
              className="group relative h-[600px] block overflow-hidden bg-luxury-black"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-12 text-center">
                <h3 className="text-3xl font-serif tracking-widest uppercase mb-4">{collection.name}</h3>
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {collection.description}
                </p>
                <div className="mt-8 w-16 h-[1px] bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                
                <span className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold border border-white/30 px-6 py-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  Explore
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
