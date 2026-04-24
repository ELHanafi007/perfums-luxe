"use client";

import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const whatsappNumber = "1234567890"; // Replace with real number
  const message = encodeURIComponent(`Hello, I'm interested in ordering ${product.name} (${product.brand}) for $${product.price}.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Section size="xl" className="pt-40">
      <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-gold transition-colors mb-16 group">
        <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-1 transition-transform" />
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden bg-luxury-cream shadow-2xl"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 hover:scale-110"
            priority
          />
          <div className="absolute inset-0 border-[1px] border-black/5 m-4 pointer-events-none" />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:pl-10"
        >
          <div className="mb-12">
            <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block">
              {product.brand}
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-luxury-black mb-8 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-luxury-black">
              ${product.price}.00
            </p>
          </div>

          <div className="space-y-10 mb-16">
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-black">Description</h3>
              <p className="text-luxury-gray leading-relaxed font-light text-lg italic">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-luxury-black">Olfactory Notes</h3>
              <div className="flex flex-wrap gap-4">
                {product.notes.map((note) => (
                  <span key={note} className="px-5 py-2 bg-luxury-cream text-[11px] uppercase tracking-widest font-bold text-luxury-black/70 border border-gray-100">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow"
            >
              <Button size="full" className="flex items-center justify-center gap-3">
                <MessageCircle size={18} strokeWidth={1.5} />
                Order via WhatsApp
              </Button>
            </a>
            <button className="w-full sm:w-16 h-16 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300">
              <Heart size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                Complimentary shipping on orders over $200
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                Signature LK ROYAL packaging included
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                Sustainably sourced rare botanicals
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
