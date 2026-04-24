"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export default function AboutPage() {
  return (
    <Section size="xl" className="pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[700px] overflow-hidden group"
        >
          <Image
            src="https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&q=80&w=800"
            alt="Perfume Craftsmanship"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 border-[20px] border-white/10 m-6 pointer-events-none" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-8 block">Our Heritage</span>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-10 leading-tight">The Story of <br />LK ROYAL</h1>
          
          <div className="space-y-8 text-luxury-gray font-light leading-relaxed text-lg italic">
            <p>
              Founded on the principles of excellence and rarity, LK ROYAL represents the pinnacle of olfactory art. 
              Our journey began in the pursuit of the world&apos;s most precious botanicals, from the high altitudes 
              of the Himalayas to the hidden valleys of Provence.
            </p>
            <p>
              Every bottle of LK ROYAL is a testament to the master perfumer&apos;s craft. We believe that 
              perfumery is a dialogue between nature and emotion, a silent language that speaks of 
              character, elegance, and timelessness.
            </p>
            <p>
              Our signature blends are aged to perfection, allowing each note to find its harmonious 
              place within the composition. We don&apos;t just create scents; we create memories 
              captured in liquid form.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-12 border-t border-gray-100 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-3xl font-serif mb-3 text-gold">100%</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Natural Ingredients</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-3xl font-serif mb-3 text-gold">24h</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Long Lasting Scent</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
