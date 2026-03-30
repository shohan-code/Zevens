import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      
      {/* Category Selection Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-black italic tracking-tighter uppercase mb-4">
                  Shop by <span className="text-accent">Category.</span>
                </h2>
                <p className="text-secondary max-w-lg mx-auto">Explore our premium collection of footwear and designer bags for every occasion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Men's Category */}
                <div className="group relative h-[600px] overflow-hidden bg-surface">
                    <Image 
                        src="/images/men-cat.png" 
                        alt="Men's Shoes and Bags" 
                        fill 
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white z-20">
                        <span className="text-accent font-bold tracking-[0.3em] text-[10px] uppercase mb-2 block">FOR HIM</span>
                        <h3 className="text-5xl font-heading font-black tracking-tighter italic mb-4">MEN'S <br /> SHOES & BAGS</h3>
                        <Link 
                            href="/products?category=men" 
                            className="inline-block border-b-2 border-white pb-1 font-bold text-sm tracking-widest hover:text-accent hover:border-accent transition-all"
                        >
                            EXPLORE COLLECTION
                        </Link>
                    </div>
                </div>

                {/* Women's Category */}
                <div className="group relative h-[600px] overflow-hidden bg-surface">
                    <Image 
                        src="/images/women-cat.png" 
                        alt="Women's Shoes and Bags" 
                        fill 
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white z-20">
                        <span className="text-accent font-bold tracking-[0.3em] text-[10px] uppercase mb-2 block">FOR HER</span>
                        <h3 className="text-5xl font-heading font-black tracking-tighter italic mb-4">WOMEN'S <br /> SHOES & BAGS</h3>
                        <Link 
                            href="/products?category=women" 
                            className="inline-block border-b-2 border-white pb-1 font-bold text-sm tracking-widest hover:text-accent hover:border-accent transition-all"
                        >
                            EXPLORE COLLECTION
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Additional "Bag" focus banner */}
            <div className="mt-10 bg-primary h-60 relative overflow-hidden flex items-center justify-center text-center px-6">
                <div className="absolute inset-0 opacity-10">
                    <p className="text-[15vw] font-black leading-none select-none tracking-tighter text-white">ACCESSORIES</p>
                </div>
                <div className="relative z-10 text-white">
                    <h3 className="text-3xl font-heading font-black italic tracking-tighter uppercase mb-4">Limited Edition Designer Bags</h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">Complement your look with our new range of premium leather bags and backpacks.</p>
                    <Link href="/products?category=bags" className="bg-white text-primary px-8 py-3 font-black text-xs tracking-tighter hover:bg-accent hover:text-white transition-all uppercase">Shop Bags</Link>
                </div>
            </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 text-[20vw] font-black text-white/5 select-none -translate-y-1/2">
            JOIN
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-8 italic">
                JOIN THE <span className="text-accent">MOVEMENT.</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                Sign up for early access to limited drops, exclusive events, and the latest in footwear innovation.
            </p>
            <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-grow bg-white/10 border border-white/20 px-6 py-4 font-bold text-sm focus:outline-none focus:border-accent transition-colors text-white"
                />
                <button className="bg-white text-primary px-8 py-4 font-black text-sm tracking-tighter hover:bg-accent hover:text-white transition-all">
                    SUBSCRIBE
                </button>
            </form>
        </div>
      </section>
    </div>
  );
}
