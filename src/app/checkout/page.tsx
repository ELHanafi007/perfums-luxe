"use client";

import { useCart } from "@/context/CartContext";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isOrdered) {
    return (
      <Section size="xl" className="pt-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} className="text-gold" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-serif mb-6 uppercase tracking-widest">Order Confirmed</h1>
          <p className="text-luxury-gray font-light italic text-lg leading-relaxed mb-12">
            Your request has been received. Our concierge will contact you shortly to arrange the delivery of your signature essences.
          </p>
          <Link href="/">
            <Button variant="outline">Return to the Atelier</Button>
          </Link>
        </motion.div>
      </Section>
    );
  }

  if (cart.length === 0) {
    return (
      <Section size="xl" className="pt-40 text-center">
        <h1 className="text-4xl font-serif mb-8 uppercase tracking-widest">Your Bag is Empty</h1>
        <Link href="/">
          <Button variant="outline">Discover Collections</Button>
        </Link>
      </Section>
    );
  }

  return (
    <Section size="xl" className="pt-40">
      <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-gold transition-colors mb-16 group">
        <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-1 transition-transform" />
        Back to Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-16">
          <div>
            <h2 className="text-2xl font-serif uppercase tracking-widest mb-10">Shipping Details</h2>
            <form onSubmit={handleOrder} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">First Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Last Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Email Address</label>
                <input required type="email" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Full Address</label>
                <input required type="text" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">City</label>
                  <input required type="text" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Postal Code</label>
                  <input required type="text" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Country</label>
                  <input required type="text" className="w-full bg-transparent border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-light italic" />
                </div>
              </div>

              <div className="pt-10">
                <Button size="full" className="py-8">Complete Selection</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-luxury-cream/30 p-10 md:p-12 border border-gray-100 sticky top-40">
            <h2 className="text-xl font-serif uppercase tracking-widest mb-10 border-b border-gray-100 pb-6">Your Selection</h2>
            <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="relative w-16 h-20 bg-luxury-cream shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h4 className="text-sm font-medium uppercase tracking-widest mb-1">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.quantity} × ${item.price}.00</p>
                  </div>
                  <div className="flex items-center text-sm font-light">
                    ${item.price * item.quantity}.00
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 border-t border-gray-100 pt-8">
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                <span>Subtotal</span>
                <span>${totalPrice}.00</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                <span>Shipping</span>
                <span className="text-gold">Complimentary</span>
              </div>
              <div className="flex justify-between text-2xl font-serif pt-4">
                <span>Total</span>
                <span>${totalPrice}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
