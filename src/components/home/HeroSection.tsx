import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface/50 -skew-x-12 transform translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase rounded-full mb-6">
            New Collection 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-heading font-black leading-none tracking-tighter mb-8 italic">
            STEP INTO <br />
            <span className="text-gradient">THE FUTURE.</span>
          </h1>
          <p className="text-secondary text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Experience unparalleled comfort and futuristic design. The new Zevens Aether series is here to redefine your walk.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/products" 
              className="px-8 py-4 bg-primary text-white font-bold rounded-sm hover:bg-accent transition-all duration-300 uppercase tracking-tighter"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 border border-black/10 font-bold rounded-sm hover:bg-black/5 transition-all duration-300 uppercase tracking-tighter"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-accent/5 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          <div className="relative transform hover:scale-105 transition-transform duration-700 ease-out">
            <Image
              src="/images/hero.png"
              alt="Premium Shoe Aether"
              width={800}
              height={800}
              priority
              className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative text */}
      <div className="absolute bottom-10 left-6 hidden md:block">
        <p className="text-[10vw] font-black text-black/5 leading-none select-none tracking-tighter">
          ZEVENS
        </p>
      </div>
    </section>
  );
}
