"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-black tracking-tighter">
          ZEVENS<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-accent transition-colors">
            HOME
          </Link>
          <Link href="/products?category=men" className="hover:text-accent transition-colors uppercase">
            MEN'S
          </Link>
          <Link href="/products?category=women" className="hover:text-accent transition-colors uppercase">
            WOMEN'S
          </Link>
          <Link href="/story" className="hover:text-accent transition-colors">
            ABOUT
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          
          <button 
            className="md:hidden p-2 text-primary hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] transition-transform duration-500 ease-out md:hidden shadow-2xl flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-black/5">
          <span className="text-xl font-heading font-black tracking-tighter">
            ZEVENS<span className="text-accent">.</span>
          </span>
          <button 
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <nav className="flex-grow p-8 flex flex-col space-y-8 text-2xl font-heading font-black italic uppercase tracking-tighter">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">HOME</Link>
            <Link href="/products?category=men" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">MEN'S</Link>
            <Link href="/products?category=women" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">WOMEN'S</Link>
            <Link href="/story" onClick={() => setIsMenuOpen(false)} className="hover:text-accent transition-colors">ABOUT</Link>
        </nav>

        <div className="p-8 border-t border-black/5 space-y-4">
            <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Official Channels</p>
            <div className="flex space-x-6">
                <a href="https://wa.me/8801772024655" target="_blank" className="text-primary hover:text-green-600 transition-colors">
                    <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="mailto:zevens@contact.com" className="text-primary hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </a>
            </div>
        </div>
      </div>
    </nav>
  );
}
