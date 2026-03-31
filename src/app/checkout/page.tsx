import { useState, Suspense, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getProducts, getSiteSettings, createOrder, Product, SiteSettings, Order } from "@/lib/firebase/firestore";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "cod">("cod");
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [transId, setTransId] = useState("");
  const [payNumber, setPayNumber] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const [prodData, settingsData] = await Promise.all([getProducts(), getSiteSettings()]);
        setProducts(prodData);
        setSiteSettings(settingsData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const selectedProduct = productId ? products.find(p => p.id === productId) : products[0];
  const itemPrice = selectedProduct?.price || 0;
  const isPreOrder = selectedProduct?.status === "pre-order";
  const deliveryCharge = 150;

  const totals = useMemo(() => {
    let dueNow = 0;
    let dueLater = 0;

    if (isPreOrder) {
        const advance = selectedProduct?.preOrderAdvance || 1000;
        dueNow = advance + deliveryCharge;
        dueLater = itemPrice - advance;
    } else {
        if (paymentMethod === "cod") {
            dueNow = deliveryCharge;
            dueLater = itemPrice;
        } else {
            dueNow = itemPrice + deliveryCharge;
            dueLater = 0;
        }
    }

    return { dueNow, dueLater };
  }, [selectedProduct, paymentMethod, isPreOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    setIsSubmitting(true);
    try {
        const orderData: Omit<Order, "id"> = {
            customerDetails: {
                ...customerInfo,
                email: "" // Optional for now
            },
            items: [{
                productId: selectedProduct.id!,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1
            }],
            totalAmount: itemPrice + deliveryCharge,
            paymentMethod,
            transId,
            payNumber,
            status: "pending"
        };
        await createOrder(orderData);
        setIsSuccess(true);
    } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to place order. Try again.");
    }
    setIsSubmitting(false);
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
                Thank you for your purchase. We have received your payment information. {totals.dueLater > 0 && `বাকি ৳${totals.dueLater.toLocaleString()} টাকা প্রোডাক্ট ডেলিভারি নেওয়ার সময় পে করতে হবে।`} আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
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
        <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-heading font-black italic tracking-tighter uppercase italic">
                Secure <span className="text-accent">Checkout.</span>
            </h1>
            <p className="text-secondary text-xs uppercase font-bold tracking-widest mt-2">Complete your order details below.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-10">
                {/* Section 01: Contact Information */}
                <div className="bg-surface p-8 rounded-sm shadow-sm space-y-6 border-t-2 border-accent/20">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-black text-xs italic">01</div>
                        <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-accent">Contact Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Full Name</label>
                             <input required type="text" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Phone Number</label>
                             <input required type="tel" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" placeholder="01XXXXXXXXX" />
                        </div>
                    </div>
                    <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Full Delivery Address</label>
                            <textarea required rows={3} value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all font-medium" placeholder="House no, Street name, City, Area"></textarea>
                    </div>
                </div>

                {/* Section 02: Payment Selection */}
                <div className="bg-surface p-8 rounded-sm shadow-sm space-y-8 border-t-2 border-accent/20">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-black text-xs italic">02</div>
                        <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-accent">Payment Selection</h3>
                    </div>
                    
                    <div className="space-y-4">
                        {!isPreOrder && (
                            <>
                                <label className={`block p-4 border-2 rounded-sm cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-black/5'}`}>
                                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm uppercase">Cash on Delivery (COD)</span>
                                        {paymentMethod === 'cod' && <div className="w-4 h-4 rounded-full bg-accent border-4 border-white" />}
                                    </div>
                                    <p className="text-[10px] text-secondary mt-1 tracking-wider uppercase font-bold">Pay ৳150 Advance</p>
                                </label>

                                <label className={`block p-4 border-2 rounded-sm cursor-pointer transition-all ${paymentMethod === 'full' ? 'border-accent bg-accent/5' : 'border-black/5'}`}>
                                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'full'} onChange={() => setPaymentMethod('full')} />
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm uppercase">Full Payment</span>
                                        {paymentMethod === 'full' && <div className="w-4 h-4 rounded-full bg-accent border-4 border-white" />}
                                    </div>
                                    <p className="text-[10px] text-secondary mt-1 tracking-wider uppercase font-bold">Pay the entire amount online</p>
                                </label>
                            </>
                        )}

                        {isPreOrder && (
                             <div className="p-4 border-2 border-accent bg-accent/5 rounded-sm">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm uppercase text-accent">PRE-ORDER BOOKING</span>
                                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-white" />
                                </div>
                                <p className="text-[10px] text-secondary mt-1 tracking-wider uppercase font-bold">Requires ৳{selectedProduct?.preOrderAdvance?.toLocaleString()} Deposit + ৳150 Shipping</p>
                             </div>
                        )}
                    </div>

                    {/* Universal Payment Details */}
                    <div className="animate-in slide-in-from-top-4 duration-300 space-y-6">
                        <div className="p-5 bg-primary text-white rounded-sm">
                            <h4 className="font-heading font-black italic tracking-tighter uppercase mb-2">Payment Instructions</h4>
                            <p className="text-xs text-white/70 leading-relaxed mb-4">
                                আপনি এখন পে করবেন: <span className="text-accent font-black tracking-widest bg-white px-2 py-0.5 rounded-sm">৳{totals.dueNow.toLocaleString()}</span>
                                <br />
                                পেমেন্ট করার পর ট্রানজ্যাকশন আইডি এবং নম্বরটি নিচে দিন।
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-3 rounded-sm border border-white/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">BKash (Personal)</p>
                                    <p className="text-sm font-black tracking-widest">{siteSettings?.bkash || '01772024655'}</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-sm border border-white/10">
                                    <p className="text-[8px] font-bold uppercase tracking-widest opacity-60">Nagad (Personal)</p>
                                    <p className="text-sm font-black tracking-widest">{siteSettings?.nagad || '01772024655'}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Sender Mobile Number</label>
                                <input required type="tel" value={payNumber} onChange={(e) => setPayNumber(e.target.value)} className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-medium" placeholder="01XXXXXXXXX" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-accent/80">Transaction ID</label>
                                <input required type="text" value={transId} onChange={(e) => setTransId(e.target.value)} className="w-full bg-background border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-medium" placeholder="TRX12345678" />
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
                                <Image src={selectedProduct?.imageUrl || "/images/prod1.png"} alt="Product" fill className="object-contain" />
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
                        
                        <div className="flex justify-between text-xl font-heading font-black pt-4 border-t border-black/10 italic">
                            <div className="flex flex-col">
                                <span className="uppercase">PAY NOW</span>
                                <span className="text-[10px] font-bold text-secondary not-italic tracking-widest mt-1 uppercase">
                                    {isPreOrder ? "(Advance Deposit + Shipping)" : paymentMethod === "cod" ? "(Delivery Charge)" : "(Full Amount)"}
                                </span>
                            </div>
                            <span className="text-accent underline decoration-2 underline-offset-4 self-start">৳ {totals.dueNow.toLocaleString()}</span>
                        </div>

                        {totals.dueLater > 0 && (
                            <div className="flex justify-between items-center py-3 px-4 bg-accent/5 rounded-sm border border-accent/10 mt-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Payable after delivery:</span>
                                <span className="font-heading font-black text-primary italic">৳ {totals.dueLater.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={isSubmitting} className={`w-full py-5 bg-primary text-white font-black uppercase tracking-tighter transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-3 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-accent shadow-lg shadow-primary/20"}`}>
                        {isSubmitting ? (
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            <span>Confirm Order</span>
                        )}
                    </button>
                    
                    <div className="p-4 bg-background rounded-sm border border-black/5 flex items-center justify-center">
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
