"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-luxury-cream/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-gold">
              New Collection 2024
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[1] mb-10 max-w-5xl text-balance"
          >
            Majestic Scents <br />
            <span className="italic font-light text-luxury-black/80">by LK ROYAL.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-luxury-gray text-lg md:text-xl max-w-2xl mb-14 font-light leading-relaxed"
          >
            Experience the fusion of rare botanicals and master craftsmanship. 
            Discover a signature fragrance that lingers long after you&apos;ve left.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Button size="lg">
              Shop Fragrances
            </Button>
            <Button variant="outline" size="lg">
              Our Story
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle background detail */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold rounded-full blur-[150px]" />
      </motion.div>
    </section>
  );
}
