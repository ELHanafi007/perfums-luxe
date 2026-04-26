"use client";

import Link from "next/link";
import Image from "next/image";
import { Section } from "./ui/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const collections = [
  {
    name: "Les Extraits",
    description: "Intense and long-lasting",
    image: "/images/les_extraits.webp",
    href: "/collections/extraits"
  },
  {
    name: "Pure Oils",
    description: "Concentrated attars and drops",
    image: "/images/pure_oils.jpg",
    href: "/collections/pure-oils"
  },
  {
    name: "Private Blend",
    description: "Exclusive & rare ingredients",
    image: "/images/private_blend.jpg",
    href: "/collections/private-blend"
  }
];

export default function Collections() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <Section id="collections" className="bg-white" size="xl">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8 border-b border-gray-100 pb-16">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gold text-[12px] uppercase tracking-[0.6em] font-bold mb-6 block"
          >
            Curated selection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif leading-tight"
          >
            The Royal <br />
            <span className="italic font-light">Compendium</span>
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-luxury-gray max-w-xs font-light italic text-lg leading-relaxed"
        >
          Explore our private archives, where every essence tells a story of centuries-old craftsmanship.
        </motion.p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
        {collections.map((collection, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 100 : -100]);
          
          return (
            <motion.div
              key={collection.name}
              style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? y : 0 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={index === 1 ? "md:mt-24" : ""}
            >
              <Link 
                href={collection.href}
                className="group relative h-[700px] block overflow-hidden bg-black"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-all duration-700" />
                
                <div className="absolute inset-x-0 bottom-0 p-12 text-white">
                  <motion.div
                    className="overflow-hidden"
                  >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-4 block translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      Discovery {index + 1}
                    </span>
                  </motion.div>
                  <h3 className="text-4xl font-serif tracking-widest uppercase mb-6">{collection.name}</h3>
                  <p className="text-[12px] font-medium tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {collection.description}
                  </p>
                  
                  <div className="mt-10 flex items-center gap-4 group/btn">
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-500">
                      <div className="w-2 h-2 bg-white group-hover/btn:bg-black rounded-full" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Learn More</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
