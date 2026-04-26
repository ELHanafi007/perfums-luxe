"use client";

import { useState, useEffect } from "react";
import { products as initialProducts } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Trash2, Edit, Plus, X, Save } from "lucide-react";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    brand: "LK ROYAL",
    price: 0,
    category: "For Her",
    image: "",
    description: "",
    notes: []
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === "lklk2026") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect passcode");
    }
  };

  if (!isAuthenticated) {
    return (
      <Section size="xl" className="pt-40 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-12 shadow-2xl text-center">
          <h2 className="text-2xl font-serif uppercase tracking-widest mb-8">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Passcode</label>
              <input 
                type="password" 
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light tracking-widest text-center"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-[10px] uppercase tracking-widest mt-2">{loginError}</p>}
            </div>
            <Button type="submit" size="full" className="mt-4">
              Enter Atelier
            </Button>
          </form>
        </div>
      </Section>
    );
  }

  // Fetch products from Supabase on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to initialProducts if Supabase fails (e.g. not configured yet)
      setProducts(initialProducts);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Is Supabase configured?");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", editingId);
        
        if (error) throw error;
        setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } as Product : p));
        setEditingId(null);
      } else {
        // Add new product
        const newProduct = {
          ...formData,
          // If your Supabase table auto-generates IDs, omit this. Assuming UUID here or let DB handle it.
        };
        
        const { data, error } = await supabase
          .from("products")
          .insert([newProduct])
          .select();
          
        if (error) throw error;
        if (data && data.length > 0) {
          setProducts([...products, data[0] as Product]);
        }
        setIsAdding(false);
      }
      setFormData({ name: "", brand: "LK ROYAL", price: 0, category: "For Her", image: "", description: "", notes: [] });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Check Supabase connection.");
    }
  };

  return (
    <Section size="xl" className="pt-40">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-4xl font-serif uppercase tracking-widest">Admin Atelier</h1>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus size={18} /> New Essence
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] uppercase tracking-[0.3em] text-gray-400 text-left">
              <th className="py-6 px-4">Perfume</th>
              <th className="py-6 px-4">Category</th>
              <th className="py-6 px-4">Price</th>
              <th className="py-6 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-luxury-cream/10 transition-colors">
                <td className="py-6 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-luxury-cream shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-serif text-lg">{product.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4 text-sm font-light uppercase tracking-widest">{product.category}</td>
                <td className="py-6 px-4 text-sm font-light">${product.price}.00</td>
                <td className="py-6 px-4 text-right">
                  <div className="flex justify-end gap-4">
                    <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-black transition-colors">
                      <Edit size={18} strokeWidth={1.5} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white z-[210] p-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif uppercase tracking-widest">
                  {editingId ? "Edit Essence" : "Add New Essence"}
                </h2>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }}>
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light italic" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Price</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light italic" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light italic bg-transparent"
                  >
                    <option value="For Her">For Her</option>
                    <option value="For Him">For Him</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light italic" 
                  />
                </div>
              </div>

              <div className="space-y-2 mb-12">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light italic resize-none" 
                />
              </div>

              <Button size="full" onClick={handleSave} className="flex items-center justify-center gap-2">
                <Save size={18} /> Save Changes
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
