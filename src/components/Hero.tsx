"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Parallax Image */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/gold_bottle.jpeg"
          alt="Luxury Background"
          fill
          className="object-cover opacity-60 grayscale-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
      </motion.div>

      {/* Animated Gold Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-gold rounded-full blur-[180px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-gold-light rounded-full blur-[180px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity }}
          >
            <span className="inline-block text-gold text-[12px] uppercase tracking-[0.8em] font-bold mb-10 border-b border-gold/30 pb-4">
              La Maison de Fragrance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: y2 }}
            className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-serif leading-[0.9] mb-12 uppercase tracking-tight"
          >
            <span className="block italic font-light text-white/90">The Essence of</span>
            <span className="block text-gold-gradient font-medium">Majesty</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="text-white/60 text-lg md:text-xl max-w-xl mb-16 font-light leading-relaxed tracking-wide italic">
              Crafted in Paris. Aged in silence. <br />
              Worn by the discerning.
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <Button variant="gold" size="lg" className="min-w-[240px] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Explore The Archive
              </Button>
              <Button variant="outline" size="lg" className="min-w-[240px] border-white/30 text-white hover:bg-white hover:text-black">
                Our Heritage
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Scroll to Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
