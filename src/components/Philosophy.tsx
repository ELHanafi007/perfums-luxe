"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Section } from "./ui/Section";

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <Section className="bg-black text-white relative overflow-hidden" size="xl">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ rotate, scale }}
          className="absolute -top-[20%] -right-[10%] w-[100%] aspect-square border border-gold/10 rounded-full" 
        />
        <motion.div 
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -40]), scale }}
          className="absolute -bottom-[20%] -left-[10%] w-[80%] aspect-square border border-gold/5 rounded-full" 
        />
      </div>

      <motion.div 
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 flex justify-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold to-transparent" />
        </motion.div>

        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold text-[12px] uppercase tracking-[0.6em] font-bold mb-12 block"
        >
          The Alchemist&apos;s Creed
        </motion.span>

        <motion.blockquote 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] italic mb-20 text-balance px-4"
        >
          &quot;A fragrance is the invisible garment that drapes the soul in majesty.&quot;
        </motion.blockquote>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-10 mb-8">
            <div className="w-16 h-px bg-gold/30" />
            <span className="text-[11px] uppercase tracking-[0.5em] text-gold font-bold">Paris — London — Dubai</span>
            <div className="w-16 h-px bg-gold/30" />
          </div>
          <p className="text-white/40 text-sm tracking-[0.2em] font-light uppercase">
            Since 1924
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
