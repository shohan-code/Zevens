"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Initial simple auth as requested
    if (username === "shohan" && password === "shohan") {
        // Save auth state in cookie or localStorage for simplicity in this stage
        localStorage.setItem("admin_auth", "true");
        router.push("/admin");
    } else {
        setError("Invalid username or password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-sm shadow-xl border-t-4 border-accent">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-black italic tracking-tighter uppercase mb-2">
            ADMIN <span className="text-accent">PORTAL.</span>
          </h1>
          <p className="text-[10px] font-bold text-secondary tracking-widest uppercase italic">Secure Login Required</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase tracking-widest p-4 rounded-sm">
                {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Username</label>
                <input 
                    type="text" 
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-medium uppercase tracking-tighter italic"
                    placeholder="ENTER USERNAME"
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Password</label>
                <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-medium"
                    placeholder="••••••••"
                />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-primary text-white font-black uppercase tracking-tighter hover:bg-accent transition-all flex items-center justify-center"
          >
            {isLoading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}
