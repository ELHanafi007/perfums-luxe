import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="text-2xl font-serif tracking-[0.3em] uppercase mb-8 block">
              LK ROYAL
            </Link>
            <p className="text-luxury-gray max-w-sm leading-relaxed mb-8 font-light italic">
              Crafting olfactory experiences that transcend time. Our perfumes are curated for those who appreciate the finer things in life.
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="text-gray-400 hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} strokeWidth={1.5} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} strokeWidth={1.5} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-[13px] text-luxury-gray uppercase tracking-widest font-medium">
              <li><Link href="/" className="hover:text-gold transition-colors">Shop All</Link></li>
              <li><Link href="/#collections" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Customer Care</h4>
            <ul className="space-y-4 text-[13px] text-luxury-gray uppercase tracking-widest font-medium">
              <li><Link href="#" className="hover:text-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Fragrance Finder</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Boutique</h4>
            <ul className="space-y-5 text-[13px] text-luxury-gray">
              <li className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                <span className="font-light italic">123 Champs-Élysées, Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                <span className="font-light">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                <span className="font-light italic underline decoration-gold/30">concierge@lkroyal.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
          <p>© {currentYear} LK ROYAL. ALL RIGHTS RESERVED.</p>
          <div className="mt-6 md:mt-0 flex gap-8">
            <p>MADE FOR THE DISCERNING.</p>
            <p>PARIS — LONDON — NEW YORK</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
