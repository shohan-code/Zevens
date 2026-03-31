import Image from "next/image";
import { useState, useEffect } from "react";
import { getSiteSettings, SiteSettings } from "@/lib/firebase/firestore";

export default function StoryPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/men-cat.png" 
            alt="Zevens Heritage" 
            fill 
            className="object-cover grayscale"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-heading font-black italic tracking-tighter uppercase mb-4">
                OUR <span className="text-accent">STORY.</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black italic">
                Redefining the walk for the modern minimalist.
            </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter">
                        Crafting <span className="text-accent">Innovation.</span>
                    </h2>
                    <div className="space-y-6 text-secondary leading-relaxed font-bold text-sm uppercase tracking-widest italic">
                        <p>
                            Zevens was born out of a simple desire: to bridge the gap between high-performance footwear and high-fashion aesthetics. We believe that what you wear on your feet should be an extension of your ambition.
                        </p>
                        <p>
                            Every pair of Zevens shoes and every accessory in our carry series is engineered with precision. We use premium materials—from high-grade leathers to breathable, sustainable knits—to ensure that our products don't just look like the future, they feel like it too.
                        </p>
                        <p>
                            Our design philosophy is rooted in minimalism. We strip away the unnecessary, leaving only what is essential for comfort, durability, and style.
                        </p>
                    </div>
                </div>

                <div className="relative aspect-[4/5] bg-surface rounded-sm overflow-hidden group shadow-2xl border-2 border-black/5">
                     <Image 
                        src="/images/women-cat.png" 
                        alt="Design Process" 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                     />
                     <div className="absolute inset-0 bg-accent/10 mix-blend-multiply opacity-30" />
                </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-surface border-y border-black/5">
        <div className="container mx-auto px-6 text-center">
            <div className="mb-16">
                <h2 className="text-4xl font-heading font-black italic uppercase tracking-tighter mb-4">
                    Contact <span className="text-accent">Us.</span>
                </h2>
                <div className="w-12 h-1 bg-accent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Email Card */}
                <div className="p-12 bg-white shadow-sm border border-black/5 hover:border-accent transition-all text-center group rounded-sm">
                    <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </div>
                    <h3 className="font-heading font-black italic uppercase tracking-tighter mb-2 text-xl italic">Email Support</h3>
                    <p className="text-[10px] text-secondary mb-8 font-black tracking-widest uppercase italic">{settings?.email || 'zevens@contact.com'}</p>
                    <a href={`mailto:${settings?.email || 'zevens@contact.com'}`} className="inline-block px-12 py-4 bg-primary text-white font-black text-[10px] tracking-widest hover:bg-accent transition-all uppercase italic">Send Message Now</a>
                </div>

                {/* WhatsApp Card */}
                <div className="p-12 bg-white shadow-sm border border-black/5 hover:border-green-500 transition-all text-center group rounded-sm">
                    <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-all transform group-hover:scale-110">
                        <svg className="w-8 h-8 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.761-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </div>
                    <h3 className="font-heading font-black italic uppercase tracking-tighter mb-2 text-xl italic">WhatsApp</h3>
                    <p className="text-[10px] text-secondary mb-8 font-black tracking-widest uppercase italic">Chat with our official support</p>
                    <a 
                      href={`https://wa.me/${settings?.whatsapp || '8801772024655'}`}
                      target="_blank" 
                      className="inline-block px-12 py-4 bg-green-600 text-white font-black text-[10px] tracking-widest hover:bg-green-700 transition-all uppercase italic"
                    >
                      Open WhatsApp Chat
                    </a>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
