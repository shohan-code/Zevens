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
    imageUrl: "",
    variants: []
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

      if (!finalImageUrl && !imageFile) {
        alert("Please provide an image URL or upload a file.");
        setIsSubmitting(false);
        return;
      }

      const productData = { 
        ...currentProduct, 
        imageUrl: finalImageUrl,
        variants: currentProduct.variants || []
      } as Omit<Product, "id">;

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

  const addVariant = () => {
    const newVariant = { type: currentProduct.category === "Bags" ? 'color' : 'size' as any, value: "", stock: 0 };
    setCurrentProduct({
        ...currentProduct,
        variants: [...(currentProduct.variants || []), newVariant]
    });
  };

  const removeVariant = (index: number) => {
    const updated = [...(currentProduct.variants || [])];
    updated.splice(index, 1);
    setCurrentProduct({ ...currentProduct, variants: updated });
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updated = [...(currentProduct.variants || [])];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentProduct({ ...currentProduct, variants: updated });
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
      imageUrl: "",
      variants: []
    });
    setImageFile(null);
    setIsEditing(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                                    <p className="text-[8px] font-black uppercase text-secondary mb-1">Or Upload Photo</p>
                                    <input 
                                        type="file" 
                                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                        accept="image/*"
                                        className="text-[10px] cursor-pointer block w-full text-secondary
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-[8px] file:font-black file:uppercase
                                        file:bg-accent/10 file:text-accent
                                        hover:file:bg-accent/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Variant Manager */}
                <div className="space-y-4 pt-4 border-t border-black/5">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Variant Stock (Size/Color)</label>
                        <button 
                            type="button" 
                            onClick={addVariant}
                            className="text-[9px] font-black uppercase text-accent hover:underline flex items-center space-x-1"
                        >
                            <span>+ ADD VARIANT</span>
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {currentProduct.variants?.map((v, idx) => (
                            <div key={idx} className="flex items-center space-x-3 bg-background p-3 rounded-sm border border-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                <select 
                                    value={v.type}
                                    onChange={(e) => updateVariant(idx, 'type', e.target.value as any)}
                                    className="bg-white border border-black/5 text-[9px] font-black uppercase px-2 py-2 rounded-sm focus:outline-none"
                                >
                                    <option value="size">SIZE</option>
                                    <option value="color">COLOR</option>
                                </select>
                                <input 
                                    type="text"
                                    placeholder={v.type === 'size' ? "E.G. 42" : "E.G. BLACK"}
                                    value={v.value}
                                    onChange={(e) => updateVariant(idx, 'value', e.target.value)}
                                    className="flex-grow bg-white border border-black/5 text-[10px] font-bold px-3 py-2 rounded-sm focus:outline-none uppercase"
                                />
                                <div className="flex items-center space-x-2">
                                    <label className="text-[8px] font-black uppercase opacity-40">STOCK</label>
                                    <input 
                                        type="number"
                                        value={v.stock}
                                        onChange={(e) => updateVariant(idx, 'stock', Number(e.target.value))}
                                        className="w-16 bg-white border border-black/5 text-[10px] font-black px-2 py-2 rounded-sm text-center"
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => removeVariant(idx)}
                                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </button>
                            </div>
                        ))}
                        {(!currentProduct.variants || currentProduct.variants.length === 0) && (
                            <p className="text-[9px] text-secondary italic opacity-50 px-2 py-4 text-center border border-dashed border-black/10 rounded-sm">No variants added yet. Track specific sizes or colors here.</p>
                        )}
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

      {/* Search Bar */}
      <div className="relative">
          <input 
            type="text" 
            placeholder="Search products by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-black/5 px-12 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent shadow-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
      </div>

      {/* Product Table */}
      <div className="bg-surface rounded-sm shadow-sm overflow-hidden border border-black/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-black/5 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Inventory</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-black/2 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 bg-background p-2">
                                        <Image src={p.imageUrl} alt={p.name} fill className="object-contain" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-black uppercase italic tracking-tighter">{p.name}</p>
                                    <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase border mt-1 inline-block ${p.status === 'in-stock' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-accent/10 text-accent border-accent/20'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {p.variants && p.variants.length > 0 ? (
                                            p.variants.map((v, i) => (
                                                <div key={i} className="text-[7px] font-black bg-black/5 px-2 py-1 rounded-sm border border-black/5">
                                                    {v.value}: <span className={v.stock > 0 ? "text-green-600" : "text-red-500"}>{v.stock}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-[8px] text-secondary italic opacity-40">No Variants</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-heading font-black text-xs text-accent whitespace-nowrap">৳ {p.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary whitespace-nowrap">{p.category}</td>
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
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-[10px] font-black uppercase opacity-30 italic">No products matched your search.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
