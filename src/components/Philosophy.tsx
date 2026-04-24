"use client";

import { motion } from "framer-motion";
import { Section } from "./ui/Section";

export default function Philosophy() {
  return (
    <Section className="bg-luxury-black text-white text-center" size="xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-10 block">
          Our Philosophy
        </span>
        <blockquote className="text-3xl md:text-5xl font-serif leading-tight italic mb-16 text-balance">
          &quot;A fragrance is more than a scent; it is a signature of your spirit, a memory waiting to be made.&quot;
        </blockquote>
        <div className="flex items-center justify-center gap-6">
          <div className="w-12 h-[1px] bg-gold/50" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">LK ROYAL</span>
          <div className="w-12 h-[1px] bg-gold/50" />
        </div>
      </motion.div>
    </Section>
  );
}
