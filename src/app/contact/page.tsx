export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Contact Us</h1>
          <p className="text-gray-500 font-light">
            Have a question about our collections or need help finding your signature scent? 
            Our fragrance experts are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Our Atelier</h3>
              <p className="text-lg font-light">
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France
              </p>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Inquiries</h3>
              <p className="text-lg font-light">
                concierge@lkroyal.com<br />
                +33 (0) 1 23 45 67 89
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Follow Us</h3>
              <div className="flex space-x-6 text-sm font-medium uppercase tracking-widest">
                <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="hover:text-gold transition-colors">Pinterest</a>
                <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Name</label>
                <input 
                  type="text" 
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors font-light"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
                <input 
                  type="email" 
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors font-light"
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
              <textarea 
                rows={4}
                className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors font-light resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button className="bg-black text-white px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold transition-colors w-full sm:w-auto">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
