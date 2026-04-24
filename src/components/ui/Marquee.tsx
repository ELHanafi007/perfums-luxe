"use client";

import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "Signature Collection",
    "Handcrafted in Paris",
    "Rare Botanicals",
    "Limited Edition",
    "Majestic Essence",
    "Pure Oils",
  ];

  return (
    <div className="bg-luxury-black py-10 overflow-hidden border-y border-gold/20">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex whitespace-nowrap gap-20"
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-20">
            <span className="text-white/20 text-4xl md:text-5xl font-serif uppercase tracking-[0.2em] italic">
              {item}
            </span>
            <div className="w-3 h-3 bg-gold rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
