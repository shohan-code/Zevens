import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-black/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-heading font-black tracking-tighter mb-4 block">
              ZEVENS<span className="text-accent">.</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              Experience the future of footwear. Premium materials, stunning design, and ultimate comfort.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/categories/mens" className="hover:text-primary transition-colors">Men's Shoes</Link></li>
              <li><Link href="/categories/womens" className="hover:text-primary transition-colors">Women's Shoes</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-secondary text-sm mb-4">Stay updated with latest releases.</p>
            <form className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border border-black/5 px-4 py-2 text-sm w-full focus:outline-none focus:border-accent transition-colors"
                required
              />
              <button className="bg-primary text-white px-4 py-2 text-sm font-bold hover:bg-accent transition-colors uppercase tracking-tight">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:row justify-between items-center text-xs text-secondary space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Zevens. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
