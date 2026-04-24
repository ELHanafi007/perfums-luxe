import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&q=80&w=800"
              alt="Perfume Craftsmanship"
              fill
              className="object-cover rounded-lg shadow-2xl"
            />
          </div>
          
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.4em] mb-6 block">Our Heritage</span>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-8">The Story of LK ROYAL</h1>
            
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                Founded on the principles of excellence and rarity, LK ROYAL represents the pinnacle of olfactory art. 
                Our journey began in the pursuit of the world's most precious botanicals, from the high altitudes 
                of the Himalayas to the hidden valleys of Provence.
              </p>
              <p>
                Every bottle of LK ROYAL is a testament to the master perfumer's craft. We believe that 
                perfumery is a dialogue between nature and emotion, a silent language that speaks of 
                character, elegance, and timelessness.
              </p>
              <p>
                Our signature blends are aged to perfection, allowing each note to find its harmonious 
                place within the composition. We don't just create scents; we create memories 
                captured in liquid form.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-100 pt-12">
              <div>
                <h3 className="text-2xl font-serif mb-2">100%</h3>
                <p className="text-xs uppercase tracking-widest text-gray-400">Natural Ingredients</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-2">24h</h3>
                <p className="text-xs uppercase tracking-widest text-gray-400">Long Lasting Scent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
