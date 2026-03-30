import Image from "next/image";
import Link from "next/link";

// Mock data (matches FeaturedProducts for consistency)
const ALL_PRODUCTS = [
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
  },
  {
    id: "4",
    name: "Stealth Runner",
    category: "Training",
    price: 15500,
    image: "/images/prod2.png",
    tag: ""
  },
  {
    id: "5",
    name: "Arctic High",
    category: "Lifestyle",
    price: 19800,
    image: "/images/prod3.png",
    tag: "Limited"
  },
  {
    id: "6",
    name: "Crimson Peak",
    category: "Running",
    price: 17200,
    image: "/images/prod1.png",
    tag: ""
  }
];

export default function ProductsPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-6">
        <header className="mb-12">
            <h1 className="text-5xl font-heading font-black italic tracking-tighter mb-4 italic uppercase">
                Product <span className="text-accent">Catalog.</span>
            </h1>
            <p className="text-secondary">Discover our wide range of premium footwear.</p>
        </header>

        <div className="flex flex-col lg:row gap-12">
            {/* Filter Sidebar Placeholder */}
            <aside className="w-full lg:w-64 space-y-8">
                <div>
                    <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-4">Categories</h3>
                    <div className="space-y-2">
                        {["All", "Running", "Training", "Lifestyle", "Basketball"].map(cat => (
                            <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                                <div className="w-4 h-4 border border-black/10 rounded-sm group-hover:border-accent transition-colors" />
                                <span className="text-sm text-secondary group-hover:text-primary">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-heading font-bold text-sm uppercase tracking-widest mb-4">Price Range</h3>
                    <input type="range" className="w-full accent-accent" />
                    <div className="flex justify-between text-[10px] font-bold text-secondary mt-2">
                        <span>৳ 5,000</span>
                        <span>৳ 50,000</span>
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {ALL_PRODUCTS.map((product) => (
                        <div key={product.id} className="group flex flex-col">
                            <div className="aspect-square bg-surface rounded-sm overflow-hidden relative mb-4 transition-all duration-500 group-hover:shadow-xl">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8 transform transition-transform duration-700 group-hover:scale-110"
                                />
                                {product.tag && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                                        {product.tag}
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transform">
                                    <Link 
                                        href={`/products/${product.id}`}
                                        className="bg-white text-primary px-6 py-3 font-bold text-sm tracking-tighter hover:bg-accent hover:text-white transition-colors uppercase"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-accent font-bold uppercase tracking-widest">{product.category}</p>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-heading font-bold text-lg group-hover:text-accent transition-colors leading-tight">{product.name}</h3>
                                    <p className="font-heading font-black text-base">৳{product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
