"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Instagram, PinIcon as Pinterest, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <Section size="xl" className="pt-40">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block"
        >
          Get in touch
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif tracking-tight mb-8"
        >
          Contact Our Atelier
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-luxury-gray font-light text-lg max-w-2xl mx-auto italic"
        >
          Have a question about our collections or need help finding your signature scent? 
          Our fragrance experts are here to assist you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="flex gap-8 group">
            <div className="w-14 h-14 bg-luxury-cream flex items-center justify-center rounded-full shrink-0 group-hover:bg-gold transition-colors duration-500">
              <MapPin size={24} strokeWidth={1.5} className="group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Our Atelier</h3>
              <p className="text-xl font-serif">
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France
              </p>
            </div>
          </div>
          
          <div className="flex gap-8 group">
            <div className="w-14 h-14 bg-luxury-cream flex items-center justify-center rounded-full shrink-0 group-hover:bg-gold transition-colors duration-500">
              <Mail size={24} strokeWidth={1.5} className="group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Inquiries</h3>
              <p className="text-xl font-serif">
                concierge@lkroyal.com<br />
                +33 (0) 1 23 45 67 89
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-8">Follow Our Journey</h3>
            <div className="flex space-x-8">
              <a href="#" className="text-luxury-gray hover:text-gold transition-all hover:-translate-y-1" aria-label="Instagram">
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-luxury-gray hover:text-gold transition-all hover:-translate-y-1" aria-label="Pinterest">
                <Pinterest size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-luxury-gray hover:text-gold transition-all hover:-translate-y-1" aria-label="LinkedIn">
                <Linkedin size={24} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form className="space-y-10 bg-luxury-cream/30 p-10 md:p-16 border border-gray-100 backdrop-blur-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-gold transition-colors font-light italic"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-gold transition-colors font-light italic"
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-gold transition-colors font-light italic resize-none"
                placeholder="How can we help?"
              />
            </div>

            <Button size="full" className="mt-4">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
