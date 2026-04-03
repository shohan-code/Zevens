"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/firebase/firestore";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching home products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const shoeProducts = products.filter(p => p.category.toLowerCase() === "running" || p.category.toLowerCase() === "lifestyle").slice(0, 4);
  const bagProducts = products.filter(p => p.category.toLowerCase() === "bags").slice(0, 4);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Trust / Benefits Section */}
      <section className="py-8 bg-white border-y border-black/5">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { title: "PREMIUM QUALITY", desc: "Crafted with the finest materials for ultimate comfort.", icon: "💎" },
                    { title: "FREE SHIPPING", desc: "Completely free delivery on orders over ৳ 30,000.", icon: "🚚" },
                    { title: "PRE-ORDER SYSTEM", desc: "Get exclusive early access to the latest global drops.", icon: "⌛" }
                ].map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-4 group cursor-default">
                        <div className="text-2xl grayscale group-hover:grayscale-0 transition-all">{benefit.icon}</div>
                        <div>
                            <h4 className="font-heading font-black text-[10px] tracking-widest text-primary italic uppercase">{benefit.title}</h4>
                            <p className="text-[10px] text-secondary mt-0.5 max-w-[200px] leading-tight">{benefit.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <FeaturedProducts />
      
      {/* Compact Category Selection Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <span className="text-accent font-black tracking-[0.4em] text-[8px] uppercase mb-2 block">COLLECTIONS</span>
                <h2 className="text-3xl md:text-4xl font-heading font-black italic tracking-tighter uppercase mb-4">
                  Shop by <span className="text-accent">Category.</span>
                </h2>
                <div className="w-12 h-1 bg-accent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Men's Category */}
                <div className="group relative h-[450px] overflow-hidden bg-surface shadow-sm rounded-sm">
                    <Image 
                        src="/images/men-cat.png" 
                        alt="Men's Shoes and Bags" 
                        fill 
                        className="object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-8 left-8 text-white z-20">
                        <p className="text-accent font-bold tracking-[0.3em] text-[8px] uppercase mb-1 block">FOR HIM</p>
                        <h3 className="text-4xl font-heading font-black tracking-tighter italic mb-4">MEN'S <br /> COLLECTION.</h3>
                        <Link 
                            href="/products?category=men" 
                            className="inline-block bg-white text-primary px-6 py-3 font-black text-[10px] tracking-widest hover:bg-accent hover:text-white transition-all uppercase"
                        >
                            Explore Now
                        </Link>
                    </div>
                </div>

                {/* Women's Category */}
                <div className="group relative h-[450px] overflow-hidden bg-surface shadow-sm rounded-sm">
                    <Image 
                        src="/images/women-cat.png" 
                        alt="Women's Shoes and Bags" 
                        fill 
                        className="object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-8 left-8 text-white z-20">
                        <p className="text-accent font-bold tracking-[0.3em] text-[8px] uppercase mb-1 block">FOR HER</p>
                        <h3 className="text-4xl font-heading font-black tracking-tighter italic mb-4">WOMEN'S <br /> COLLECTION.</h3>
                        <Link 
                            href="/products?category=women" 
                            className="inline-block bg-white text-primary px-6 py-3 font-black text-[10px] tracking-widest hover:bg-accent hover:text-white transition-all uppercase"
                        >
                            Explore Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW SECTION: SHOES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-black/5 pb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-heading font-black italic tracking-tighter uppercase italic">SHOP <span className="text-accent">SHOES.</span></h2>
                <Link href="/products?category=shoes" className="text-[10px] font-black tracking-[0.2em] hover:text-accent transition-colors uppercase italic underline underline-offset-4">View All Footwear</Link>
            </div>
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                    {[1,2,3,4].map(n => <div key={n} className="aspect-square bg-gray-100 rounded-sm" />)}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {shoeProducts.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <Link href={`/products/${product.id}`}>
                                <div className="aspect-square bg-surface mb-4 relative overflow-hidden group-hover:shadow-lg transition-all duration-300">
                                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-8 transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute bottom-4 left-4 bg-primary text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest">{product.category}</div>
                                </div>
                                <h3 className="font-heading font-bold text-xs uppercase truncate">{product.name}</h3>
                                <p className="font-heading font-black text-sm text-accent">৳ {product.price.toLocaleString()}</p>
                            </Link>
                        </div>
                    ))}
                    {shoeProducts.length === 0 && <p className="col-span-full py-10 text-center text-[10px] uppercase font-bold opacity-30 italic">No footwear found in collection.</p>}
                </div>
            )}
        </div>
      </section>

      {/* NEW SECTION: BAGS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-black/5 pb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-heading font-black italic tracking-tighter uppercase italic">SHOP <span className="text-accent">BAGS.</span></h2>
                <Link href="/products?category=bags" className="text-[10px] font-black tracking-[0.2em] hover:text-accent transition-colors uppercase italic underline underline-offset-4">View All Accessories</Link>
            </div>
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                    {[1,2,3,4].map(n => <div key={n} className="aspect-square bg-gray-100 rounded-sm" />)}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {bagProducts.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <Link href={`/products/${product.id}`}>
                                <div className="aspect-square bg-surface mb-4 relative overflow-hidden group-hover:shadow-lg transition-all duration-300">
                                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-8 transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute bottom-4 left-4 bg-primary text-white text-[8px] font-black px-2 py-1 uppercase tracking-widest">{product.category}</div>
                                </div>
                                <h3 className="font-heading font-bold text-xs uppercase truncate">{product.name}</h3>
                                <p className="font-heading font-black text-sm text-accent">৳ {product.price.toLocaleString()}</p>
                            </Link>
                        </div>
                    ))}
                    {bagProducts.length === 0 && <p className="col-span-full py-10 text-center text-[10px] uppercase font-bold opacity-30 italic">No bags found in collection.</p>}
                </div>
            )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter mb-4 italic uppercase">
                JOIN THE <span className="text-accent">CLAN.</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 text-sm italic uppercase tracking-widest">
                Be the first to know about upcoming limited edition drops.
            </p>
            <form className="max-w-md mx-auto flex flex-col md:flex-row gap-3">
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-grow bg-white/5 border border-white/10 px-6 py-4 font-bold text-[10px] focus:outline-none focus:border-accent transition-colors text-white uppercase italic tracking-widest"
                />
                <button className="bg-white text-primary px-8 py-4 font-black text-[10px] tracking-tighter hover:bg-accent hover:text-white transition-all uppercase">
                    SUBSCRIBE
                </button>
            </form>
        </div>
      </section>
    </div>
  );
}

