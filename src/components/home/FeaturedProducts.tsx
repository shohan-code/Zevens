import Image from "next/image";
import Link from "next/link";

const FEAT_PRODUCTS = [
  {
    id: "1",
    name: "Aether Blue Edition",
    category: "Running",
    price: 18500,
    image: "/images/prod1.png",
    tag: "Trending"
  },
  {
    id: "2",
    name: "Neon Velocity",
    category: "Training",
    price: 14200,
    image: "/images/prod2.png",
    tag: "New"
  },
  {
    id: "3",
    name: "Urban Lux Gold",
    category: "Lifestyle",
    price: 22000,
    image: "/images/prod3.png",
    tag: "Exclusive"
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-heading font-black tracking-tighter mb-4 italic">
              FEATURED <span className="text-accent">DROPS.</span>
            </h2>
            <p className="text-secondary max-w-md">
              Hand-picked selection of our most innovative and premium footwear.
            </p>
          </div>
          <Link href="/products" className="hidden md:flex items-center space-x-2 text-sm font-bold border-b border-black hover:text-accent hover:border-accent transition-all pb-1">
            <span>VIEW ALL</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEAT_PRODUCTS.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-square bg-background rounded-sm overflow-hidden relative mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transform transition-transform duration-700 group-hover:scale-110"
                />
                
                {product.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest leading-none">
                    {product.tag}
                  </span>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transform">
                  <Link 
                    href={`/products/${product.id}`}
                    className="bg-white text-primary px-6 py-3 font-bold text-sm tracking-tighter hover:bg-accent hover:text-white transition-colors uppercase"
                  >
                    Quick View
                  </Link>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest">{product.category}</p>
                <div className="flex justify-between items-start">
                  <h3 className="font-heading font-bold text-xl group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="font-heading font-black text-lg">৳ {product.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
