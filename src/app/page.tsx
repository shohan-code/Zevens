import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Trust / Benefits Section - New */}
      <section className="py-12 bg-white border-y border-black/5">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { title: "PREMIUM QUALITY", desc: "Crafted with the finest materials for ultimate comfort.", icon: "💎" },
                    { title: "FREE SHIPPING", desc: "Completely free delivery on orders over ৳ 30,000.", icon: "🚚" },
                    { title: "PRE-ORDER SYSTEM", desc: "Get exclusive early access to the latest global drops.", icon: "⌛" }
                ].map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-4 group cursor-default">
                        <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{benefit.icon}</div>
                        <div>
                            <h4 className="font-heading font-black text-sm tracking-widest text-primary italic uppercase">{benefit.title}</h4>
                            <p className="text-xs text-secondary mt-1 max-w-[200px] leading-relaxed">{benefit.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <FeaturedProducts />
      
      {/* Category Selection Section - Polished */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <div className="text-center mb-20">
                <span className="text-accent font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">COLLECTIONS</span>
                <h2 className="text-5xl md:text-6xl font-heading font-black italic tracking-tighter uppercase mb-6">
                  Shop by <span className="text-accent">Category.</span>
                </h2>
                <div className="w-20 h-1 bg-accent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Men's Category */}
                <div className="group relative h-[650px] overflow-hidden bg-surface shadow-md">
                    <Image 
                        src="/images/men-cat.png" 
                        alt="Men's Shoes and Bags" 
                        fill 
                        className="object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                    <div className="absolute bottom-12 left-10 text-white z-20">
                        <p className="text-accent font-bold tracking-[0.3em] text-[10px] uppercase mb-2 block">FOR HIM</p>
                        <h3 className="text-6xl font-heading font-black tracking-tighter italic mb-6">MEN'S <br /> DROPS.</h3>
                        <Link 
                            href="/products?category=men" 
                            className="inline-block bg-white text-primary px-8 py-4 font-black text-xs tracking-widest hover:bg-accent hover:text-white transition-all uppercase"
                        >
                            Explore Shoes & Bags
                        </Link>
                    </div>
                </div>

                {/* Women's Category */}
                <div className="group relative h-[650px] overflow-hidden bg-surface shadow-md">
                    <Image 
                        src="/images/women-cat.png" 
                        alt="Women's Shoes and Bags" 
                        fill 
                        className="object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                    <div className="absolute bottom-12 left-10 text-white z-20">
                        <p className="text-accent font-bold tracking-[0.3em] text-[10px] uppercase mb-2 block">FOR HER</p>
                        <h3 className="text-6xl font-heading font-black tracking-tighter italic mb-6">WOMEN'S <br /> LOOKS.</h3>
                        <Link 
                            href="/products?category=women" 
                            className="inline-block bg-white text-primary px-8 py-4 font-black text-xs tracking-widest hover:bg-accent hover:text-white transition-all uppercase"
                        >
                            Explore Shoes & Bags
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Bag Promo Section */}
            <div className="mt-12 bg-primary h-72 relative overflow-hidden flex items-center justify-center text-center px-6">
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <p className="text-[15vw] font-black leading-none select-none tracking-tighter text-white">ACCESSORIES</p>
                </div>
                <div className="relative z-10 text-white max-w-2xl">
                    <span className="text-accent font-bold tracking-[0.4em] text-[10px] uppercase mb-2 block">NEW ARRIVALS</span>
                    <h3 className="text-4xl md:text-5xl font-heading font-black italic tracking-tighter uppercase mb-4 italic">The Zevens Carry Series</h3>
                    <p className="text-white/60 mb-8 text-sm font-medium">Engineered for the modern minimalist. Premium leather construction meets ergonomic design in our new bag collection.</p>
                    <Link href="/products?category=bags" className="inline-block border-2 border-white px-10 py-4 font-black text-xs tracking-widest hover:bg-white hover:text-primary transition-all uppercase">Browse All Bags</Link>
                </div>
            </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-primary text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 text-[20vw] font-black text-white/5 select-none -translate-y-1/2">
            JOIN
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-8xl font-heading font-black tracking-tighter mb-8 italic italic uppercase">
                JOIN THE <span className="text-accent">CLAN.</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-12 text-lg">
                Be the first to know about upcoming limited edition drops and exclusive events.
            </p>
            <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-grow bg-white/5 border border-white/10 px-8 py-5 font-bold text-sm focus:outline-none focus:border-accent transition-colors text-white uppercase italic tracking-widest"
                />
                <button className="bg-white text-primary px-10 py-5 font-black text-sm tracking-tighter hover:bg-accent hover:text-white transition-all uppercase">
                    SUBSCRIBE
                </button>
            </form>
        </div>
      </section>
    </div>
  );
}
