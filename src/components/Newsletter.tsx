"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Section } from "./ui/Section";

export default function Newsletter() {
  return (
    <Section className="bg-white border-y border-gray-100" size="lg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">Join the Circle</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-8">Receive Private Invitations</h2>
          <p className="text-luxury-gray font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Be the first to experience our limited edition releases and private events. 
            Subscribe to the LK ROYAL newsletter.
          </p>
          
          <form 
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-[2] border-b border-gray-300 px-2 py-4 focus:outline-none focus:border-gold transition-colors font-light italic bg-transparent"
            />
            <Button className="flex-1" variant="primary">
              Subscribe
            </Button>
          </form>
          
          <p className="mt-8 text-[10px] uppercase tracking-widest text-gray-400">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
