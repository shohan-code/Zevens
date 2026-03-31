"use client";

import { useEffect, useState } from "react";
import { getSiteSettings, SiteSettings } from "@/lib/firebase/firestore";

export default function AnnouncementBar() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (error) {
       // Silently fail or use defaults
    }
  };

  const fetchSettings = fetchData;

  if (!settings?.announcement) return null;

  return (
    <div className="bg-accent text-white py-2 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-center italic relative z-[100]">
      {settings.announcement}
    </div>
  );
}
