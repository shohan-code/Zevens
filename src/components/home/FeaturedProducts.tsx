"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/firebase/firestore";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeat = async () => {
      try {
        const data = await getProducts();
        // Show only latest 5
        setProducts(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeat();
  }, []);

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-heading font-black tracking-tighter mb-2 italic uppercase">
              FEATURED <span className="text-accent">DROPS.</span>
            </h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-secondary max-w-md">
              Hand-picked selection of our most innovative and premium footwear.
            </p>
          </div>
          <Link href="/products" className="hidden md:flex items-center space-x-2 text-[10px] font-black tracking-widest border-b-2 border-black hover:text-accent hover:border-accent transition-all pb-1 uppercase">
            <span>VIEW ALL</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 animate-pulse">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="aspect-square bg-gray-200 rounded-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="aspect-square bg-background rounded-sm overflow-hidden relative mb-4 transition-all duration-500 group-hover:shadow-xl">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transform transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-white text-[8px] font-black uppercase tracking-widest leading-none">
                    {product.status === 'in-stock' ? 'NEW' : 'PRE-ORDER'}
                  </span>
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center translate-y-2 group-hover:translate-y-0 transform">
                    <Link 
                      href={`/products/${product.id}`}
                      className="bg-white text-primary px-4 py-2 font-black text-[10px] tracking-tighter hover:bg-accent hover:text-white transition-colors uppercase"
                    >
                      Quick View
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-[8px] text-accent font-black uppercase tracking-[0.2em]">{product.category}</p>
                  <h3 className="font-heading font-bold text-xs group-hover:text-accent transition-colors leading-tight uppercase truncate">{product.name}</h3>
                  <p className="font-heading font-black text-sm text-primary">৳ {product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

