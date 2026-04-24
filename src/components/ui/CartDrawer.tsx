"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "./Button";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif uppercase tracking-widest">Your Bag</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'} selected
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:rotate-90 transition-transform duration-300"
                aria-label="Close Cart"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-luxury-cream rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} strokeWidth={1} className="text-gray-300" />
                  </div>
                  <div>
                    <p className="text-xl font-serif italic text-luxury-gray">Your bag is empty</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Discover our collections to begin</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-32 bg-luxury-cream shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold mb-1">{item.brand}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <h3 className="text-lg font-serif mb-2">{item.name}</h3>
                        <p className="text-sm font-light text-luxury-gray">${item.price}.00</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-100 px-3 py-1 gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-luxury-cream/20">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Total Price</span>
                  <span className="text-2xl font-serif">${totalPrice}.00</span>
                </div>
                <div className="space-y-4">
                  <Button size="full" className="py-6">
                    Proceed to Checkout
                  </Button>
                  <p className="text-[9px] text-center uppercase tracking-[0.2em] text-gray-400">
                    Complimentary shipping on all orders
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
