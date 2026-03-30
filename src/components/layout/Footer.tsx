import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-black/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
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
              <li><Link href="/story" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/returns" className="hover:text-accent transition-colors">Return Policy</Link></li>
              <li>
                <a href="https://wa.me/8801772024655" target="_blank" className="flex items-center space-x-2 hover:text-green-600 transition-colors group">
                  <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span>WHATSAPP</span>
                </a>
              </li>
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
