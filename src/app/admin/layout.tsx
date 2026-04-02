"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (isAuthenticated === null) return <div className="min-h-screen flex items-center justify-center bg-background uppercase font-black tracking-widest text-[10px]">Verifying Session...</div>;

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    )},
    { label: "Products", href: "/admin/products", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.27 6.96 8.73 5.04 8.73-5.04"/><path d="M12 22.08V12"/></svg>
    )},
    { label: "Orders", href: "/admin/orders", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    )},
    { label: "Customers", href: "/admin/customers", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )},
    { label: "Settings", href: "/admin/settings", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
    )}
  ];

  const SidebarContent = () => (
    <>
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <Link href="/" className="text-xl font-heading font-black tracking-tighter text-white">
                ZEVENS<span className="text-accent">.</span>
                <span className="ml-2 px-2 py-0.5 bg-accent text-white text-[8px] italic rounded-sm uppercase">ADMIN</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
        <nav className="flex-grow p-6 space-y-2">
            {menuItems.map((item) => (
                <Link 
                    key={item.href} 
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-all group ${pathname === item.href ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                    <span className={`transition-transform duration-300 group-hover:scale-110 ${pathname === item.href ? 'text-white' : 'text-accent/60'}`}>{item.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </Link>
            ))}
        </nav>
        <div className="p-6 border-t border-white/5">
            <button 
                onClick={() => { sessionStorage.removeItem("admin_auth"); router.push("/admin/login"); }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-white/40 hover:text-red-500 transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
            </button>
        </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-primary border-r border-white/5 flex flex-col hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-72 bg-primary animate-in slide-in-from-left duration-300 flex flex-col shadow-2xl">
                <SidebarContent />
            </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
            <div className="flex items-center space-x-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-black/5 rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent italic">
                    {pathname === "/admin" ? "DASHBOARD Overview" : pathname.replace("/admin/", "").toUpperCase()}
                </h2>
            </div>
            
            <div className="flex items-center space-x-4 md:space-x-6">
                <div className="hidden sm:flex flex-col items-end">
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">Logged in as</p>
                    <p className="text-xs font-bold italic text-accent uppercase">Shohan Admin</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-surface rounded-full flex items-center justify-center border border-black/5">
                    <span className="text-xs font-black italic">SH</span>
                </div>
            </div>
        </header>
        
        <div className="p-4 md:p-10">
            {children}
        </div>
      </main>
    </div>
  );
}
