"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock cart items for design purposes
const MOCK_CART = [
  {
    id: "1",
    name: "Aether Blue Edition",
    price: 18500,
    quantity: 1,
    image: "/images/prod1.png",
    size: 42
  }
];

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-surface shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between px-8 py-8 border-b border-black/5">
          <h2 className="text-2xl font-heading font-black italic tracking-tighter uppercase">
            YOUR <span className="text-accent">CART.</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-8 py-8 space-y-6">
          {MOCK_CART.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-24 h-24 bg-background rounded-sm relative flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-grow space-y-1">
                <h3 className="font-heading font-bold text-sm leading-none">{item.name}</h3>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Size: {item.size}</p>
                <div className="flex justify-between items-end pt-2">
                  <div className="flex items-center border border-black/10 rounded-sm">
                    <button className="px-2 py-1 hover:bg-black/5 transition-colors">-</button>
                    <span className="px-3 py-1 font-bold text-xs">{item.quantity}</span>
                    <button className="px-2 py-1 hover:bg-black/5 transition-colors">+</button>
                  </div>
                  <p className="font-heading font-black text-sm">৳ {item.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-8 py-8 bg-background border-t border-black/5 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Subtotal</span>
              <span>৳ 18,500</span>
            </div>
            <div className="flex justify-between text-xs text-secondary">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          
          <Link 
            href="/checkout"
            onClick={onClose}
            className="block w-full py-4 bg-primary text-white text-center font-black uppercase tracking-tighter hover:bg-accent transition-all duration-300"
          >
            Checkout Now
          </Link>
          <button 
            onClick={onClose}
            className="w-full text-center text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
