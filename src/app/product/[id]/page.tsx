import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <Link href="/" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-400 hover:text-luxury-black transition-colors mb-12">
        <ArrowLeft size={16} className="mr-2" />
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-white border-2 border-transparent hover:border-gold transition-all duration-500">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold mb-4 block">
              {product.brand}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-luxury-black mb-6">
              {product.name}
            </h1>
            <p className="text-2xl font-light text-luxury-black">
              ${product.price}.00
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-black">Description</h3>
            <p className="text-luxury-gray leading-relaxed font-light text-lg">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-luxury-black">Olfactory Notes</h3>
            <div className="flex flex-wrap gap-3">
              {product.notes.map((note) => (
                <span key={note} className="px-4 py-2 bg-white border border-gray-100 text-sm tracking-wide">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center gap-3 luxury-button uppercase tracking-widest text-xs"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </a>
            <button className="px-8 py-3 border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs">
              Add to Wishlist
            </button>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-loose">
              Complimentary shipping on orders over $200. <br />
              Signature LUXE ESSENCE packaging included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
