"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "./ui/Section";

export default function Experience() {
  return (
    <Section className="bg-luxury-cream/30 overflow-hidden" size="xl">
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

        {/* Right Image */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden shadow-[30px_30px_60px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/curated.png"
              alt="Curated Collection"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
