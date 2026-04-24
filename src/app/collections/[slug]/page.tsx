import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const categoryMap: { [key: string]: string } = {
    "signature": "Signature",
    "pure-oils": "Pure Oils",
    "limited-edition": "Limited Edition",
    "for-her": "For Her",
    "for-him": "For Him",
    "unisex": "Unisex"
  };

  const categoryName = categoryMap[params.slug];
  
  if (!categoryName) {
    notFound();
  }

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block">Collection</span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight uppercase">{categoryName}</h1>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-gray-200">
            <p className="text-gray-400 font-light italic">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "signature" },
    { slug: "pure-oils" },
    { slug: "limited-edition" },
    { slug: "for-her" },
    { slug: "for-him" },
    { slug: "unisex" }
  ];
}
