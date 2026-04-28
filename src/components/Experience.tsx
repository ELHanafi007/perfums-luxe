"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Section } from "./ui/Section";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <Section ref={containerRef} className="bg-luxury-cream/30 overflow-hidden" size="xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Text */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-[11px] uppercase tracking-[0.6em] font-bold mb-8 block">The Experience</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-10 leading-tight">
              A Symphony <br />
              <span className="italic font-light">of the Senses</span>
            </h2>
            <div className="space-y-8 text-luxury-gray font-light leading-relaxed text-lg">
              <p>
                From the moment the cold glass touches your skin to the hours that follow, 
                an LK ROYAL fragrance is an evolving masterpiece.
              </p>
              <p className="italic">
                &quot;The top notes whisper an invitation, the heart notes sing a story, 
                and the base notes leave an eternal legacy.&quot;
              </p>
            </div>
            
            <motion.div 
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-16 flex items-center gap-6 cursor-pointer group"
            >
              <div className="w-16 h-px bg-black group-hover:w-24 group-hover:bg-gold transition-all duration-500" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold">Discover the Art</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Parallax Images */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative h-[600px] md:h-[800px] w-full">
            <motion.div 
              style={{ scale }}
              className="absolute top-0 right-0 w-[85%] h-[90%] overflow-hidden shadow-[30px_30px_60px_rgba(0,0,0,0.1)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200"
                alt="Perfume Bottle"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div 
              style={{ y }}
              className="absolute bottom-0 left-0 w-[50%] h-[60%] overflow-hidden shadow-2xl border-[15px] border-white z-10"
            >
              <Image
                src="/images/curated.png"
                alt="Curated Collection"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating Gold Element */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 w-32 h-32 border border-gold/20 -z-10"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
