"use client";

import { useEffect, useState } from "react";
import { getSiteSettings, updateSiteSettings, SiteSettings } from "@/lib/firebase/firestore";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp: "",
    email: "",
    bkash: "",
    nagad: "",
    announcement: ""
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      await updateSiteSettings(settings);
      setMessage("Settings updated successfully! Changes are now live.");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      alert("Error updating settings");
    }
    setIsSubmitting(false);
  };

  if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-widest italic animate-pulse">Retrieving Global Configurations...</div>;

  return (
    <div className="max-w-4xl space-y-12">
      <h2 className="text-3xl font-heading font-black italic tracking-tighter uppercase">Brand <span className="text-accent">Settings.</span></h2>

      <div className="bg-surface p-8 rounded-sm shadow-xl border-t-4 border-accent">
        <h3 className="text-sm font-heading font-black italic tracking-tighter uppercase mb-8">Global Configuration.</h3>
        
        {message && (
            <div className="mb-8 bg-green-500/10 border border-green-500/50 text-green-600 text-[10px] font-black uppercase tracking-widest p-4 rounded-sm animate-bounce">
                {message}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Official WhatsApp Number</label>
                    <input 
                        required 
                        type="text" 
                        value={settings.whatsapp} 
                        onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                        className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-bold tracking-widest"
                        placeholder="E.G. 01772024655"
                    />
                    <p className="text-[8px] text-secondary/60 font-bold uppercase mt-1 italic">Include country code if necessary (e.g. 880...)</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Contact Email Address</label>
                    <input 
                        required 
                        type="email" 
                        value={settings.email} 
                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                        className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-bold tracking-widest uppercase italic"
                        placeholder="zevens@contact.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">BKash Personal Number</label>
                    <input 
                        required 
                        type="text" 
                        value={settings.bkash} 
                        onChange={(e) => setSettings({...settings, bkash: e.target.value})}
                        className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-bold tracking-widest"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Nagad Personal Number</label>
                    <input 
                        required 
                        type="text" 
                        value={settings.nagad} 
                        onChange={(e) => setSettings({...settings, nagad: e.target.value})}
                        className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-bold tracking-widest"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary">Announcement Bar Text</label>
                <input 
                    type="text" 
                    value={settings.announcement} 
                    onChange={(e) => setSettings({...settings, announcement: e.target.value})}
                    className="w-full bg-background border border-black/5 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all font-medium uppercase italic tracking-tighter"
                    placeholder="E.G. FREE DELIVERY ON ORDERS OVER ৳ 30,000"
                />
            </div>

            <div className="pt-4">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-4 bg-primary text-white font-black uppercase tracking-tighter hover:bg-accent transition-all shadow-lg shadow-primary/20"
                >
                    {isSubmitting ? "Updating System..." : "Save Global Settings"}
                </button>
            </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="p-8 bg-black/5 rounded-sm border border-dashed border-black/10">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-40">Storefront Preview</h4>
            <div className="space-y-4 opacity-60">
                 <div className="bg-accent text-white py-1 px-4 text-[8px] font-black uppercase tracking-widest text-center">
                    {settings.announcement || "YOUR ANNOUNCEMENT HERE"}
                 </div>
                 <div className="flex justify-between items-center bg-white p-4 text-[10px] font-bold">
                    <span>{settings.email}</span>
                    <span className="text-green-600">WhatsApp: {settings.whatsapp}</span>
                 </div>
            </div>
      </div>
    </div>
  );
}
