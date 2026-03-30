"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

// Mock data (matching Catalog)
const PRODUCTS = [
  {
    id: "1",
    name: "Aether Blue Edition",
    category: "Running",
    price: 18500,
    image: "/images/prod1.png",
    description: "Built for elite performance. The Aether Blue features our most advanced cushioning system yet, providing ultimate energy return and futuristic aesthetics.",
    features: ["Responsive Cushioning", "Breathable Mesh Upper", "Carbon Fiber Plate", "Durable All-Weather Outsole"],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    status: "in-stock"
  },
  {
    id: "2",
    name: "Neon Velocity",
    category: "Training",
    price: 14200,
    image: "/images/prod2.png",
    description: "Lightning fast. The Neon Velocity is designed for explosive movements and high-intensity training sessions.",
    features: ["Lightweight build", "Lateral stability", "High-grip outsole"],
    sizes: [40, 41, 42, 43],
    status: "pre-order"
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0]; 
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-6">
        <Link href="/products" className="inline-flex items-center space-x-2 text-sm font-bold text-secondary hover:text-accent mb-12 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>BACK TO SHOP</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Gallery */}
            <div className="space-y-6">
                <div className="aspect-square bg-surface rounded-sm relative overflow-hidden group">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-12 transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.status === "pre-order" && (
                        <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 font-black text-xs uppercase tracking-widest z-20">
                            PRE-ORDER ONLY
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(idx => (
                        <div key={idx} className="aspect-square bg-surface rounded-sm relative opacity-50 hover:opacity-100 cursor-pointer transition-opacity border hover:border-accent">
                             <Image
                                src={product.image}
                                alt={`${product.name} variant ${idx}`}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em]">
                            {product.category}
                        </p>
                        {product.status === "pre-order" && (
                            <span className="bg-accent/10 text-accent px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter">Limited Release</span>
                        )}
                    </div>
                    <h1 className="text-5xl font-heading font-black italic tracking-tighter uppercase">
                        {product.name}
                    </h1>
                    <p className="text-3xl font-heading font-black text-accent mt-2">
                        ৳ {product.price.toLocaleString()}
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-secondary leading-relaxed">
                        {product.description}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                        {product.features.map(f => (
                            <li key={f} className="flex items-center space-x-3 text-sm font-medium">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-4">Select Size (EU)</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 flex items-center justify-center font-bold text-sm rounded-sm transition-all border ${
                                    selectedSize === size 
                                    ? "bg-primary text-white border-primary" 
                                    : "bg-surface border-black/5 hover:border-accent text-primary"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-8 space-y-4">
                    <button className={`w-full py-5 text-white font-black uppercase tracking-tighter transition-all duration-300 transform active:scale-[0.98] ${product.status === 'pre-order' ? 'bg-accent hover:bg-black' : 'bg-primary hover:bg-accent'}`}>
                        {product.status === 'pre-order' ? 'Pre-order Now' : 'Add to Cart'}
                    </button>
                    
                    <div className="flex flex-col gap-3 py-6 border-y border-black/5">
                         {product.status === 'in-stock' ? (
                            <div className="flex items-center space-x-3 text-xs font-bold text-green-600 uppercase tracking-widest">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                <span>In Stock - Ready to Ship</span>
                            </div>
                         ) : (
                            <div className="flex items-center space-x-3 text-xs font-bold text-accent uppercase tracking-widest">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                <span>Pre-order: Estimated shipping in 10-14 days</span>
                            </div>
                         )}
                         <div className="flex justify-between items-center text-xs text-secondary font-medium">
                            <p>Free Delivery on orders over ৳ 30,000</p>
                            <Link href="/shipping" className="underline hover:text-accent">Shipping Info</Link>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
