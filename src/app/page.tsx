"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/firebase/firestore";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        // If firebase is not yet configured, this will throw an error
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full bg-indigo-600 text-white py-16 px-8 flex flex-col items-center text-center shadow-md">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Dynamic E-Commerce</h1>
        <p className="text-xl text-indigo-100 max-w-2xl">
          A premium storefront built with Next.js and powered by Firebase Firestore & Storage.
        </p>
      </header>

      <main className="w-full max-w-6xl p-8 -mt-8">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {products.length} Products
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center flex-col items-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-slate-500 font-medium">Loading products from Firestore...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center border border-slate-100">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              📦
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Please configure your Firebase credentials in <code className="bg-slate-100 px-2 py-1 rounded">.env.local</code> and add products to your Firestore "products" collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col group">
                <div className="h-56 bg-slate-100 relative w-full flex-shrink-0 overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500 bg-slate-50">
                      <span className="text-4xl">👟</span>
                    </div>
                  )}
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-indigo-700 shadow-sm">
                      {product.category}
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50">
                    <span className="text-xl font-black text-slate-800">${product.price.toFixed(2)}</span>
                    <button className="bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
