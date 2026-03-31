"use client";

import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from "@/lib/firebase/firestore";
import { uploadImage } from "@/lib/firebase/storage";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "Running",
    status: "in-stock",
    preOrderAdvance: 0,
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalImageUrl = currentProduct.imageUrl;

      if (imageFile) {
        const path = `products/${Date.now()}_${imageFile.name}`;
        finalImageUrl = await uploadImage(imageFile, path);
      }

      const productData = { ...currentProduct, imageUrl: finalImageUrl } as Omit<Product, "id">;

      if (isEditing && currentProduct.id) {
        await updateProduct(currentProduct.id, productData);
      } else {
        await addProduct(productData);
      }

      fetchProducts();
      resetForm();
    } catch (error) {
        console.error("Error saving product:", error);
      alert("Error saving product. Check console.");
    }
    setIsSubmitting(false);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: "",
      description: "",
      price: 0,
      category: "Running",
      status: "in-stock",
      preOrderAdvance: 0,
      imageUrl: ""
    });
    setImageFile(null);
    setIsEditing(false);
  };

  if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-widest italic animate-pulse">Scanning Inventory...</div>;

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-heading font-black italic tracking-tighter uppercase">Product <span className="text-accent">Manager.</span></h2>

      {/* Product Form */}
      <div className="bg-surface p-8 rounded-sm shadow-xl border-t-4 border-accent">
        <h3 className="text-sm font-heading font-black italic tracking-tighter uppercase mb-8">
            {isEditing ? "Edit Product" : "Add New Product"}.
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Product Name</label>
                    <input 
                        required 
                        type="text" 
                        value={currentProduct.name} 
                        onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                        className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-medium uppercase italic tracking-tighter"
                        placeholder="E.G. AETHER BLUE EDITION"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Price (৳)</label>
                        <input 
                            required 
                            type="number" 
                            value={currentProduct.price} 
                            onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                            className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-black tracking-widest"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Category</label>
                        <select 
                            value={currentProduct.category} 
                            onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                            className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest"
                        >
                            <option>Running</option>
                            <option>Training</option>
                            <option>Lifestyle</option>
                            <option>Bags</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Description</label>
                    <textarea 
                        required 
                        rows={3}
                        value={currentProduct.description} 
                        onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                        className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-medium"
                        placeholder="Describe the premium features..."
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Status</label>
                        <select 
                            value={currentProduct.status} 
                            onChange={(e) => setCurrentProduct({...currentProduct, status: e.target.value as any})}
                            className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-bold uppercase tracking-widest"
                        >
                            <option value="in-stock">IN-STOCK</option>
                            <option value="pre-order">PRE-ORDER</option>
                        </select>
                    </div>
                    {currentProduct.status === "pre-order" && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent">Advance Amount (৳)</label>
                            <input 
                                required 
                                type="number" 
                                value={currentProduct.preOrderAdvance} 
                                onChange={(e) => setCurrentProduct({...currentProduct, preOrderAdvance: Number(e.target.value)})}
                                className="w-full bg-background border border-accent/20 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-black tracking-widest text-accent"
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Product Image</label>
                    <div className="space-y-4 bg-background p-4 border border-black/5 rounded-sm">
                        <div className="flex items-center space-x-6">
                            <div className="relative w-24 h-24 bg-surface flex-shrink-0 border border-black/5 p-2">
                                {currentProduct.imageUrl ? (
                                    <Image src={currentProduct.imageUrl} alt="Preview" fill className="object-contain p-2" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl grayscale opacity-30">👟</div>
                                )}
                            </div>
                            <div className="flex-grow space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black uppercase text-secondary">External Image URL</p>
                                    <input 
                                        type="text" 
                                        value={currentProduct.imageUrl} 
                                        onChange={(e) => setCurrentProduct({...currentProduct, imageUrl: e.target.value})}
                                        className="w-full bg-surface border border-black/5 px-3 py-2 text-[10px] focus:outline-none focus:border-accent"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                                <div className="relative">
                                    <p className="text-[8px] font-black uppercase text-secondary mb-1">Or Upload (Disabled - Use URL Above)</p>
                                    <input 
                                        type="file" 
                                        disabled
                                        accept="image/*"
                                        className="text-[10px] opacity-30 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-[8px] text-secondary italic">Firebase Storage is currently disabled. Please use direct image URLs from Unsplash, Imgur, or other sources.</p>
                    </div>
                </div>

                <div className="flex space-x-4 pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-grow py-4 bg-primary text-white font-black uppercase tracking-tighter hover:bg-accent transition-all shadow-lg shadow-primary/20"
                    >
                        {isSubmitting ? "Syncing..." : isEditing ? "Update Product" : "Launch Product"}
                    </button>
                    {isEditing && (
                        <button 
                            type="button" 
                            onClick={resetForm}
                            className="px-8 py-4 bg-surface text-secondary font-black uppercase tracking-tighter hover:bg-black/5 transition-all text-[10px]"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </form>
      </div>

      {/* Product Table */}
      <div className="bg-surface rounded-sm shadow-sm overflow-hidden border border-black/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-black/5 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-black/2 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 bg-background p-2">
                                        <Image src={p.imageUrl} alt={p.name} fill className="object-contain" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-black uppercase italic tracking-tighter">{p.name}</p>
                                    <p className="text-[8px] text-secondary truncate max-w-[200px]">{p.description}</p>
                                </td>
                                <td className="px-6 py-4 font-heading font-black text-xs text-accent">৳ {p.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">{p.category}</td>
                                <td className="px-6 py-4">
                                     <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border ${p.status === 'in-stock' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-accent/10 text-accent border-accent/20'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button onClick={() => handleEdit(p)} className="p-2 hover:bg-blue-500/10 text-blue-600 rounded-sm transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button onClick={() => handleDelete(p.id!)} className="p-2 hover:bg-red-500/10 text-red-600 rounded-sm transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
