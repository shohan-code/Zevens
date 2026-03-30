import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="glass border-b border-black/5 py-4 px-8 sticky top-0 z-30">
        <div className="flex justify-between items-center">
            <Link href="/admin" className="text-xl font-heading font-black tracking-tighter italic">
                ZEVENS <span className="text-accent underline">ADMIN.</span>
            </Link>
            <div className="flex items-center space-x-6 text-xs font-bold uppercase tracking-widest">
                <Link href="/" className="text-secondary hover:text-primary">View Site</Link>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">A</div>
            </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
            {[
                { name: "Dashboard", icon: "📊", active: true },
                { name: "Products", icon: "👟", active: false },
                { name: "Orders", icon: "📦", active: false },
                { name: "Customers", icon: "👥", active: false },
                { name: "Settings", icon: "⚙️", active: false }
            ].map(item => (
                <button 
                    key={item.name}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-sm font-bold text-sm tracking-tighter transition-all ${
                        item.active ? "bg-primary text-white" : "hover:bg-black/5 text-secondary"
                    }`}
                >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                </button>
            ))}
        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Total Revenue", value: "৳ 1,24,500", trend: "+12%" },
                    { label: "Total Orders", value: "48", trend: "+5" },
                    { label: "Products", value: "12", trend: "0" }
                ].map((stat, i) => (
                    <div key={i} className="bg-surface p-6 rounded-sm shadow-sm border border-black/5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">{stat.label}</p>
                        <h4 className="text-2xl font-heading font-black italic">{stat.value}</h4>
                        <p className="text-[10px] font-bold text-green-500 mt-2">{stat.trend} from last month</p>
                    </div>
                ))}
            </div>

            <div className="bg-surface rounded-sm shadow-sm border border-black/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-widest">Recent Orders</h3>
                    <button className="text-[10px] font-bold text-accent underline underline-offset-4 uppercase">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-background text-[10px] font-black uppercase tracking-widest text-secondary">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {[
                                { id: "ZV-9821", name: "Ahmed Shohan", status: "Pending", amount: "৳ 18,500" },
                                { id: "ZV-9820", name: "Rakibul Islam", status: "Shipped", amount: "৳ 14,200" },
                                { id: "ZV-9819", name: "Nusrat Jahan", status: "Delivered", amount: "৳ 22,000" }
                            ].map((order, i) => (
                                <tr key={i} className="text-sm hover:bg-black/5 transition-colors">
                                    <td className="px-6 py-4 font-bold">{order.id}</td>
                                    <td className="px-6 py-4 font-medium">{order.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            order.status === "Pending" ? "bg-accent/10 text-accent" : 
                                            order.status === "Shipped" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-heading font-black">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-[10px] font-bold bg-primary text-white px-3 py-1 rounded-sm hover:bg-accent transition-colors">DETAILS</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
