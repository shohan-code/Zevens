"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to /api/checkout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div className="max-w-md w-full px-6 text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h1 className="text-4xl font-heading font-black italic tracking-tighter italic italic italic italic uppercase italic">
                ORDER <span className="text-accent">PLACED!</span>
            </h1>
            <p className="text-secondary leading-relaxed">
                Thank you for your purchase. We have received your order. Our team will contact you shortly on your mobile number to confirm the delivery.
            </p>
            <div className="pt-4">
                <button 
                    onClick={() => window.location.href = "/"}
                    className="px-8 py-4 bg-primary text-white font-black uppercase tracking-tighter hover:bg-accent transition-all"
                >
                    Back to Home
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-6">
        <header className="mb-12">
            <h1 className="text-5xl font-heading font-black italic tracking-tighter italic italic italic italic uppercase italic">
                Secure <span className="text-accent">Checkout.</span>
            </h1>
            <p className="text-secondary">Complete your order details below.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Customer Details */}
            <div className="space-y-10 bg-surface p-8 rounded-sm shadow-sm">
                <div className="space-y-6">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase border-b border-black/5 pb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Full Name</label>
                             <input required type="text" className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Phone Number</label>
                             <input required type="tel" className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="01XXXXXXXXX" />
                        </div>
                    </div>
                    <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Email Address</label>
                            <input required type="email" className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="email@example.com" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase border-b border-black/5 pb-4">Shipping Address</h3>
                    <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Full Address</label>
                            <textarea required rows={3} className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="House no, Street name, City, Area"></textarea>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase border-b border-black/5 pb-4">Payment Method</h3>
                    <div className="p-4 border-2 border-accent bg-accent/5 rounded-sm flex items-center space-x-4">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="font-bold text-sm">Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[10px] text-secondary">Pay with cash when your product is delivered to your doorstep.</p>
                </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-8 lg:sticky lg:top-24">
                 <div className="bg-surface p-8 rounded-sm shadow-sm space-y-6">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase">Order Summary</h3>
                    
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-background rounded-sm relative flex-shrink-0">
                                <Image src="/images/prod1.png" alt="Product" fill className="object-contain p-2" />
                            </div>
                            <div className="flex-grow py-1">
                                <h4 className="font-bold text-sm leading-tight">Aether Blue Edition</h4>
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Qty: 1 | Size: 42</p>
                                <p className="font-heading font-black text-sm mt-1">৳ 18,500</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-black/5 space-y-3">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Subtotal</span>
                            <span>৳ 18,500</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                            <span>Shipping</span>
                            <span className="text-green-600 font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-xl font-heading font-black pt-4 border-t border-black/5 italic">
                            <span>TOTAL</span>
                            <span>৳ 18,500</span>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-5 bg-primary text-white font-black uppercase tracking-tighter transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-3 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-accent"}`}
                    >
                        {isSubmitting ? (
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            <span>Confirm Order</span>
                        )}
                    </button>
                    <p className="text-[10px] text-center text-secondary leading-relaxed">
                        By placing your order, you agree to Zevens <br /> <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                    </p>
                 </div>
            </div>
        </form>
      </div>
    </div>
  );
}
