"use client";

import { useEffect, useState } from "react";
import { getOrders, Order } from "@/lib/firebase/firestore";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const orders = await getOrders();
      // Extract unique customers by phone/email
      const customerMap = new Map();
      
      orders.forEach(order => {
        const key = order.customerDetails.phone;
        if (!customerMap.has(key)) {
          customerMap.set(key, {
            ...order.customerDetails,
            totalSpent: order.totalAmount,
            orderCount: 1,
            lastOrder: order.createdAt
          });
        } else {
          const existing = customerMap.get(key);
          existing.totalSpent += order.totalAmount;
          existing.orderCount += 1;
        }
      });
      
      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
    setLoading(false);
  };

  if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-widest italic animate-pulse">Scanning Client Database...</div>;

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-heading font-black italic tracking-tighter uppercase">Customer <span className="text-accent">Insight.</span></h2>

      <div className="bg-surface rounded-sm shadow-sm overflow-hidden border border-black/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-black/5 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Total Orders</th>
                            <th className="px-6 py-4 text-right">Total Spent</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {customers.map((c, i) => (
                            <tr key={i} className="hover:bg-black/2 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-xs font-black uppercase italic tracking-tighter">{c.name}</p>
                                    <p className="text-[8px] text-secondary truncate">{c.address}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-[10px] font-bold tracking-widest">{c.phone}</p>
                                    <p className="text-[8px] opacity-60 uppercase">{c.email}</p>
                                </td>
                                <td className="px-6 py-4 font-heading font-black text-xs">{c.orderCount} Orders</td>
                                <td className="px-6 py-4 text-right font-heading font-black text-sm text-accent">৳ {c.totalSpent.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
