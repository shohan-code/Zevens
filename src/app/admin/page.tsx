"use client";

import { useEffect, useState } from "react";
import { getOrders, getProducts, Order, Product } from "@/lib/firebase/firestore";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: "Total Orders", value: "0", icon: "📦", trend: "..." },
    { label: "Total Revenue", value: "৳ 0", icon: "💰", trend: "..." },
    { label: "Active Products", value: "0", icon: "👟", trend: "..." },
    { label: "Pending Verification", value: "0", icon: "⏳", trend: "..." },
  ]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [orders, products] = await Promise.all([getOrders(), getProducts()]);
      
      // Calculate Stats
      const totalRevenue = orders.reduce((sum, order) => {
        const isRevenue = ['confirmed', 'shipped', 'delivered'].includes(order.status);
        if (isRevenue) return sum + order.totalAmount;
        return sum;
      }, 0);

      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats([
        { label: "Total Orders", value: orders.length.toString(), icon: "📦", trend: `+${orders.length}` },
        { label: "Total Revenue", value: `৳ ${totalRevenue.toLocaleString()}`, icon: "💰", trend: "Live" },
        { label: "Active Products", value: products.length.toString(), icon: "👟", trend: "Live" },
        { label: "Pending Verification", value: pendingOrders.toString(), icon: "⏳", trend: pendingOrders > 0 ? "Urgent" : "Clean" },
      ]);

      // Get last 5 orders
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setLoading(false);
  };

  if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-widest italic animate-pulse">Syncing Business Core...</div>;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
            <div key={i} className="bg-surface p-8 rounded-sm shadow-sm border-t-2 border-accent/20 group hover:border-accent transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${stat.trend.includes('+') ? 'bg-green-500/10 text-green-600' : 'bg-accent/10 text-accent'}`}>
                        {stat.trend}
                    </span>
                </div>
                <h3 className="text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                <p className="text-2xl font-heading font-black italic tracking-tighter uppercase">{stat.value}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders Preview */}
            <div className="lg:col-span-2 bg-surface p-8 rounded-sm shadow-sm">
                <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
                    <h3 className="text-sm font-heading font-black italic tracking-tighter uppercase">Recent Activity.</h3>
                    <Link href="/admin/orders" className="text-[9px] font-black uppercase tracking-widest text-accent hover:underline">View All Orders</Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/5 text-[9px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {recentOrders.map((o) => (
                                <tr key={o.id} className="hover:bg-black/2 transition-colors">
                                    <td className="px-6 py-4 text-[10px] font-black italic">#{o.id?.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-[10px] font-bold uppercase">{o.customerDetails.name}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase border ${
                                            o.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                                            o.status === 'confirmed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                                            o.status === 'shipped' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                                            o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                                            'bg-red-500/10 text-red-600 border-red-500/20'
                                        }`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-black text-[10px] text-accent">৳ {o.totalAmount.toLocaleString()}</td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center text-[10px] font-bold uppercase opacity-30 italic">No recent activity detected.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Performance Snapshot */}
            <div className="bg-primary text-white p-8 rounded-sm shadow-sm relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-full bg-accent/20 -skew-x-12 translate-x-1/2" />
                <div className="relative z-10">
                    <h3 className="text-sm font-heading font-black italic tracking-tighter uppercase mb-6">Security Check.</h3>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white/10 rounded-full text-accent shadow-lg shadow-accent/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Encrypted Sync</p>
                                <p className="text-[8px] text-white/60 font-bold uppercase">All admin operations are logged and secured.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">System Update</p>
                            <p className="text-[10px] font-bold italic">Dynamic settings are now linked directly to Firestore clusters.</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
}

