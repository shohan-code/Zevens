"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Mock data (matching Catalog/Details)
const PRODUCTS = [
  { id: "1", name: "Aether Blue Edition", category: "Running", price: 18500, image: "/images/prod1.png" },
  { id: "2", name: "Neon Velocity", category: "Training", price: 14200, image: "/images/prod2.png" },
  { id: "b1", name: "Urban Stealth Backpack", category: "Bags", price: 12500, image: "/images/hero.png" },
  { id: "b2", name: "Lux Handbag Gold", category: "Bags", price: 28000, image: "/images/prod3.png" },
  { id: "3", name: "Urban Lux Gold", category: "Lifestyle", price: 22000, image: "/images/prod3.png" },
  { id: "4", name: "Stealth Runner", category: "Training", price: 15500, image: "/images/prod2.png" }
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "cod">("cod");
  
  // Payment Verification Fields
  const [transId, setTransId] = useState("");
  const [payNumber, setPayNumber] = useState("");

  const selectedProduct = productId ? PRODUCTS.find(p => p.id === productId) : PRODUCTS[0];
  const itemPrice = selectedProduct?.price || 0;
  const deliveryCharge = 150;
  const total = itemPrice + deliveryCharge;

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
            <h1 className="text-4xl font-heading font-black italic tracking-tighter uppercase italic">
                ORDER <span className="text-accent">PLACED!</span>
            </h1>
            <p className="text-sm text-secondary leading-relaxed">
                Thank you for your purchase. We have received your order details and payment information. আমাদের টিম আপনার ট্রানজ্যাকশন আইডি যাচাই করে অর্ডারটি কনফার্ম করবে।
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
            <h1 className="text-5xl font-heading font-black italic tracking-tighter uppercase italic">
                Secure <span className="text-accent">Checkout.</span>
            </h1>
            <p className="text-secondary">Complete your order details below.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Customer Details */}
            <div className="space-y-10">
                <div className="bg-surface p-8 rounded-sm shadow-sm space-y-6 border-t-2 border-accent/20">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-black text-xs italic">01</div>
                        <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-accent">Contact Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Full Name</label>
                             <input required type="text" className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Phone Number</label>
                             <input required type="tel" className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" placeholder="01XXXXXXXXX" />
                        </div>
                    </div>
                    <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Full Delivery Address</label>
                            <textarea required rows={3} className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" placeholder="House no, Street name, City, Area"></textarea>
                    </div>
                </div>

                {/* Payment Selection */}
                <div className="bg-surface p-8 rounded-sm shadow-sm space-y-8 border-t-2 border-accent/20">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-black text-xs italic">02</div>
                        <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-accent">Payment Selection</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <label className={`block p-4 border-2 rounded-sm cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-black/5'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="hidden" 
                                checked={paymentMethod === 'cod'} 
                                onChange={() => setPaymentMethod('cod')} 
                            />
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-sm uppercase">Cash on Delivery (COD)</span>
                                {paymentMethod === 'cod' && <div className="w-4 h-4 rounded-full bg-accent border-4 border-white" />}
                            </div>
                            <p className="text-[10px] text-secondary mt-1 tracking-wider uppercase font-bold">Pay ৳150 advance for shipping</p>
                        </label>

                        <label className={`block p-4 border-2 rounded-sm cursor-pointer transition-all ${paymentMethod === 'full' ? 'border-accent bg-accent/5' : 'border-black/5'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="hidden" 
                                checked={paymentMethod === 'full'} 
                                onChange={() => setPaymentMethod('full')} 
                            />
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-sm uppercase">Full Payment (Advanced)</span>
                                {paymentMethod === 'full' && <div className="w-4 h-4 rounded-full bg-accent border-4 border-white" />}
                            </div>
                            <p className="text-[10px] text-secondary mt-1 tracking-wider uppercase font-bold">Pay the entire amount online for priority shipping</p>
                        </label>
                    </div>

                    {/* Universal Payment Details */}
                    <div className="animate-in slide-in-from-top-4 duration-300 space-y-6">
                        <div className="p-5 bg-primary text-white rounded-sm">
                            <h4 className="font-heading font-black italic tracking-tighter uppercase mb-2">Payment Instructions</h4>
                            <p className="text-xs text-white/70 leading-relaxed mb-4">
                                {paymentMethod === 'cod' 
                                    ? `অর্ডারটি কনফার্ম করতে ডেলিভারি চার্জ ৳${deliveryCharge} অগ্রিম প্রদান করুন।` 
                                    : `অর্ডারটি কনফার্ম করতে সম্পূর্ণ মূল্য ৳${total.toLocaleString()} প্রদান করুন।`
                                } বিকাশ অথবা নগদ (Personal) নাম্বারে সেন্ড মানি করার পর নিচের তথ্যগুলো দিন।
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-3 rounded-sm border border-white/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">BKash (Personal)</p>
                                    <p className="text-sm font-black tracking-widest">01700-000000</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-sm border border-white/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">Nagad (Personal)</p>
                                    <p className="text-sm font-black tracking-widest">01800-000000</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Sender Mobile Number</label>
                                <input 
                                    required 
                                    type="tel" 
                                    value={payNumber}
                                    onChange={(e) => setPayNumber(e.target.value)}
                                    className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" 
                                    placeholder="01XXXXXXXXX" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Transaction ID</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={transId}
                                    onChange={(e) => setTransId(e.target.value)}
                                    className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" 
                                    placeholder="TRX12345678" 
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Payment Screenshot (Upload)</label>
                            <div className="border-2 border-dashed border-black/10 p-10 text-center rounded-sm hover:border-accent transition-colors cursor-pointer group">
                                <svg className="w-10 h-10 text-black/10 mx-auto group-hover:text-accent transition-colors mb-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Click to upload screenshot</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-8 lg:sticky lg:top-24">
                 <div className="bg-surface p-8 rounded-sm shadow-sm space-y-6 border-t-4 border-accent">
                    <h3 className="font-heading font-bold text-sm tracking-widest uppercase">Order Summary</h3>
                    
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-background rounded-sm relative flex-shrink-0 p-2">
                                <Image src={selectedProduct?.image || "/images/prod1.png"} alt="Product" fill className="object-contain" />
                            </div>
                            <div className="flex-grow py-1">
                                <h4 className="font-bold text-sm leading-tight uppercase tracking-tight">{selectedProduct?.name}</h4>
                                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1">Qty: 1 | Size: 42</p>
                                <p className="font-heading font-black text-sm mt-1">৳ {itemPrice.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-black/5 space-y-3">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-secondary uppercase text-[10px] font-bold tracking-widest">Subtotal</span>
                            <span className="font-bold">৳ {itemPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-secondary uppercase text-[10px] font-bold tracking-widest">Shipping Fee</span>
                            <span className="font-bold">৳ {deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-heading font-black pt-4 border-t border-black/10 italic">
                            <span>TOTAL</span>
                            <span className="text-accent underline decoration-2 underline-offset-4">৳ {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-5 bg-primary text-white font-black uppercase tracking-tighter transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-3 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-accent shadow-lg shadow-primary/20"}`}
                    >
                        {isSubmitting ? (
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            <span>Confirm Order & Pay</span>
                        )}
                    </button>
                    
                    <div className="p-4 bg-background rounded-sm border border-black/5">
                         <div className="flex items-center space-x-3 text-[9px] font-bold text-secondary uppercase tracking-widest">
                            <svg className="w-4 h-4 text-accent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <span>Verified Secure Order by Zevens Security</span>
                         </div>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
