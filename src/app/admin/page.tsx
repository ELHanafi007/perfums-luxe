"use client";

import { useState, useEffect } from "react";
import { products as initialProducts } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Trash2, Edit, Plus, X, Save, Upload } from "lucide-react";
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

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Fetch products from Supabase on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

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
      setUploading(true);
      let imageUrl = formData.image;

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const productData = { ...formData, image: imageUrl };

      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId);
        
        if (error) throw error;
        setProducts(products.map(p => p.id === editingId ? { ...p, ...productData } as Product : p));
        setEditingId(null);
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert([productData])
          .select();
          
        if (error) throw error;
        if (data && data.length > 0) {
          setProducts([...products, data[0] as Product]);
        }
        setIsAdding(false);
      }
      setFormData({ name: "", brand: "LK ROYAL", price: 0, category: "For Her", image: "", description: "", notes: [] });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Check Supabase connection and Storage bucket.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Section size="xl" className="pt-24 lg:pt-40">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 lg:mb-16">
        <h1 className="text-3xl lg:text-4xl font-serif uppercase tracking-widest">Admin Atelier</h1>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus size={18} /> New Essence
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
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

      {/* Mobile Grid View */}
      <div className="lg:hidden grid grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 p-6 space-y-4">
            <div className="flex gap-4">
              <div className="w-20 h-24 bg-luxury-cream shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">{product.brand}</p>
                <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-widest font-light text-gray-400">{product.category}</span>
                  <span className="text-lg font-light">${product.price}.00</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-50">
              <button 
                onClick={() => handleEdit(product)} 
                className="flex-grow flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-widest font-bold border border-gray-100 hover:bg-black hover:text-white transition-all"
              >
                <Edit size={14} /> Edit
              </button>
              <button 
                onClick={() => handleDelete(product.id)} 
                className="flex-grow flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-widest font-bold border border-red-50 hover:bg-red-500 hover:text-white transition-all text-red-400"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed top-[5%] lg:top-1/2 left-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-[92%] max-w-2xl max-h-[90vh] overflow-y-auto bg-white z-[210] p-8 lg:p-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 lg:mb-10">
                <h2 className="text-xl lg:text-2xl font-serif uppercase tracking-widest">
                  {editingId ? "Edit Essence" : "Add New Essence"}
                </h2>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }}>
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-10">
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
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image && !selectedFile && (
                      <div className="w-10 h-12 bg-luxury-cream shrink-0 overflow-hidden">
                        <img src={formData.image} className="w-full h-full object-cover" alt="Current" />
                      </div>
                    )}
                    <label className="flex-grow border-b border-gray-100 py-2 focus-within:border-gold cursor-pointer flex items-center gap-2">
                      <Upload size={14} className="text-gray-400" />
                      <span className="text-[10px] sm:text-xs font-light italic text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                        {selectedFile ? selectedFile.name : "Upload Photo"}
                      </span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-10 lg:mb-12">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-b border-gray-100 py-2 focus:outline-none focus:border-gold font-light italic resize-none" 
                />
              </div>

              <Button 
                size="full" 
                onClick={handleSave} 
                className="flex items-center justify-center gap-2 py-6 lg:py-4"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : (editingId ? "Save Changes" : "Add Essence")}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}
