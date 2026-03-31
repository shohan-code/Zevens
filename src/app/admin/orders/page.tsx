"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, Order } from "@/lib/firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'confirmed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'shipped': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'delivered': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-widest italic animate-pulse">Synchronizing with Firestore...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-heading font-black italic tracking-tighter uppercase">Order <span className="text-accent">Management.</span></h2>
        <button onClick={fetchOrders} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Order List Table */}
        <div className="xl:col-span-2 bg-surface rounded-sm shadow-sm overflow-hidden border border-black/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-black/5 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {orders.map((order) => (
                            <tr 
                                key={order.id} 
                                className={`group cursor-pointer transition-colors hover:bg-black/2 ${selectedOrder?.id === order.id ? 'bg-accent/5' : ''}`}
                                onClick={() => setSelectedOrder(order)}
                            >
                                <td className="px-6 py-4">
                                    <p className="text-[10px] font-black uppercase text-accent truncate max-w-[80px]">#{order.id?.slice(-6)}</p>
                                    <p className="text-[8px] text-secondary font-bold">{new Date(order.createdAt!).toLocaleDateString()}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-bold uppercase truncate max-w-[120px]">{order.customerDetails.name}</p>
                                    <p className="text-[9px] text-secondary truncate max-w-[120px]">{order.customerDetails.phone}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border ${order.paymentMethod === 'full' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                        {order.paymentMethod}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-heading font-black text-xs">৳ {order.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {orders.length === 0 && (
                <div className="py-20 text-center text-sm italic text-secondary">No orders found.</div>
            )}
        </div>

        {/* Order Details Sidebar */}
        <div className="xl:col-span-1 space-y-6">
            {selectedOrder ? (
                <div className="bg-surface p-8 rounded-sm shadow-xl border-t-4 border-accent animate-in fade-in slide-in-from-right-4 duration-500 h-full overflow-y-auto max-h-[80vh]">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                             <h3 className="text-sm font-heading font-black italic tracking-tighter uppercase mb-1">Order Details.</h3>
                             <p className="text-[10px] font-bold text-accent uppercase tracking-widest">#{selectedOrder.id}</p>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-black/5 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Customer Info */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary border-b border-black/5 pb-2">Customer Info</p>
                            <div className="space-y-2">
                                <p className="text-xs font-bold uppercase">{selectedOrder.customerDetails.name}</p>
                                <p className="text-xs text-primary">{selectedOrder.customerDetails.phone}</p>
                                <p className="text-[10px] text-secondary leading-relaxed bg-background p-3 rounded-sm">{selectedOrder.customerDetails.address}</p>
                            </div>
                        </div>

                        {/* Payment Verification */}
                        <div className="space-y-4">
                             <p className="text-[10px] font-black uppercase tracking-widest text-secondary border-b border-black/5 pb-2">Payment Verification</p>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="bg-background p-3 rounded-sm border border-black/5">
                                    <p className="text-[8px] font-black uppercase text-secondary opacity-60">Sender Number</p>
                                    <p className="text-xs font-black tracking-widest">{selectedOrder.payNumber}</p>
                                </div>
                                <div className="bg-background p-3 rounded-sm border border-black/5">
                                    <p className="text-[8px] font-black uppercase text-secondary opacity-60">Transaction ID</p>
                                    <p className="text-xs font-black tracking-widest text-accent">{selectedOrder.transId}</p>
                                </div>
                             </div>
                             {selectedOrder.screenshotUrl && (
                                <div className="mt-4">
                                    <p className="text-[8px] font-black uppercase text-secondary mb-2">Screenshot</p>
                                    <div className="relative aspect-video bg-black rounded-sm overflow-hidden group">
                                         <Link href={selectedOrder.screenshotUrl} target="_blank">
                                            <Image src={selectedOrder.screenshotUrl} alt="Payment SS" fill className="object-contain hover:scale-105 transition-transform duration-500" />
                                         </Link>
                                    </div>
                                </div>
                             )}
                        </div>

                        {/* Status Update */}
                        <div className="space-y-4 pt-4">
                             <p className="text-[10px] font-black uppercase tracking-widest text-secondary border-b border-black/5 pb-2">Update Status</p>
                             <div className="grid grid-cols-2 gap-2">
                                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
                                    <button 
                                        key={s}
                                        onClick={() => handleStatusUpdate(selectedOrder.id!, s as any)}
                                        className={`px-3 py-2 text-[8px] font-black uppercase tracking-widest transition-all rounded-sm border ${selectedOrder.status === s ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-background border-black/10 hover:border-accent'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 space-y-3">
                             <a 
                                href={`https://wa.me/${selectedOrder.customerDetails.phone.replace(/[^0-9]/g, '')}?text=Hi ${selectedOrder.customerDetails.name}, your Zevens order #${selectedOrder.id?.slice(-6)} is ${selectedOrder.status}!`}
                                target="_blank"
                                className="w-full py-4 bg-green-500 text-white font-black text-[10px] tracking-widest uppercase flex items-center justify-center space-x-2 hover:bg-green-600 transition-all rounded-sm italic"
                             >
                                <svg className="w-4 h-4 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                <span>Notify via WhatsApp</span>
                             </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-surface p-12 rounded-sm border border-black/5 border-dashed flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center text-2xl grayscale">📦</div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary">No Selection</h4>
                        <p className="text-[10px] text-secondary">Click on an order to view details and update status.</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
