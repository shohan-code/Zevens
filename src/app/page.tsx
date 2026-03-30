import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      
      {/* Category Selection Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-heading font-black mb-16 italic tracking-tighter uppercase">
              Shop by <span className="text-accent">Category.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[400px] bg-surface flex items-center justify-center group cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors z-10" />
                    <div className="z-20 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                        <h3 className="text-5xl font-heading font-black tracking-tighter italic mb-2">MEN'S</h3>
                        <p className="font-bold tracking-[0.2em] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-b border-primary inline-block">EXPLORE COLLECTION</p>
                    </div>
                </div>
                <div className="h-[400px] bg-surface flex items-center justify-center group cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors z-10" />
                    <div className="z-20 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                        <h3 className="text-5xl font-heading font-black tracking-tighter italic mb-2">WOMEN'S</h3>
                        <p className="font-bold tracking-[0.2em] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-b border-primary inline-block">EXPLORE COLLECTION</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Newsletter / Join Section */}
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
                    className="flex-grow bg-white/10 border border-white/20 px-6 py-4 font-bold text-sm focus:outline-none focus:border-accent transition-colors"
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
