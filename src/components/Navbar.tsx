"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./ui/SearchOverlay";

const navLinks = [
  { name: "Shop", href: "/" },
  { name: "Collections", href: "/#collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/95 backdrop-blur-md py-4 border-b border-gray-100 shadow-sm" 
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden" 
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-gold/30">
              <Image src="/images/logo.jpeg" alt="LK ROYAL Logo" fill className="object-cover" />
            </div>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5 md:space-x-8">
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search" 
              className="hover:text-gold transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group" 
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:text-gold transition-colors" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-[60] p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-lg font-serif tracking-widest uppercase">Menu</span>
                <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-serif tracking-wide hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  LK ROYAL Premium Perfumery
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </nav>
  );
}
