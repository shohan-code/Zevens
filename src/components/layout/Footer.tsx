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
            <h4 className="font-heading font-bold text-[10px] uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><a href="mailto:zevens@contact.com" className="hover:text-accent transition-colors">zevens@contact.com</a></li>
              <li><a href="https://wa.me/8801772024655" target="_blank" className="hover:text-accent transition-colors">WhatsApp: 01772024655</a></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-[10px] uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-secondary text-[10px] mb-4 uppercase font-bold tracking-widest">Stay updated with latest releases.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-background border border-black/10 px-4 py-3 text-[10px] w-full focus:outline-none focus:border-accent transition-colors font-bold tracking-widest"
                required
              />
              <button className="bg-primary text-white px-4 py-3 text-[10px] font-black hover:bg-accent transition-colors uppercase tracking-widest italic">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[8px] font-black uppercase tracking-widest text-secondary space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ZEVENS. DESIGNED FOR THE FUTURE.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
