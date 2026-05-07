"use client";

import { useState } from "react";
import GirlGrid from "@/components/girl/GirlGrid";
import { useLanguage } from "@/context/LanguageContext";
import ContactBanner from "@/components/layout/ContactBanner";
import { girls } from "@/lib/data";

const locations = ["All", "CBD", "Central", "North", "East"];

export default function CollectionPage() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredGirls = activeFilter === "All" 
    ? girls 
    : girls.filter(m => m.location === activeFilter);

  return (
    <main className="min-h-screen bg-noir pt-44 transition-colors duration-700">
      {/* Erotic Header Banner */}
      <header className="relative w-full h-[180px] md:h-[450px] flex flex-col justify-end -mt-32 mb-16 overflow-hidden border-b border-emerald/20 bg-noir">
        {/* Background Erotic Image */}
        <div className="absolute inset-0 z-0 bg-noir">
          <img 
            src="/images/header-bg-custom.webp" 
            alt="Sensual Collection Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-emerald/5 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir via-noir/20 to-noir" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 mt-12 mb-6 max-w-4xl mx-auto w-full text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-emerald drop-shadow-[0_0_15px_rgba(184,134,11,0.3)] font-bold font-playfair tracking-wider">
            {t.nav.collection}
          </h1>
          <p className="hidden md:block text-white/70 leading-relaxed font-sans text-xs md:text-sm mt-8 max-w-2xl mx-auto px-6">
            {activeFilter === "All" 
              ? t.grid.intro 
              : `${activeFilter === "All" ? (lang === "cn" ? "全部" : "All") : (t.girl.locations[activeFilter] || activeFilter)} ${t.nav.collection}`}
          </p>
        </div>

        <ContactBanner />
      </header>
      
      {/* Search/Filter Bar */}
      <section className="px-8 mb-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {locations.map((loc) => {
            const label = loc === "All" 
              ? (lang === "cn" ? "全部" : "All")
              : (t.girl.locations[loc] || loc);
            
            return (
              <button
                key={loc}
                onClick={() => setActiveFilter(loc)}
                className={`px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 font-bold border ${
                  activeFilter === loc 
                    ? "bg-emerald text-noir border-emerald shadow-[0_0_15px_rgba(184,134,11,0.4)]" 
                    : "bg-noir-soft/40 text-white/30 border-emerald/20 hover:border-emerald/40 hover:text-white shadow-sm backdrop-blur-sm"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <GirlGrid girls={filteredGirls} />
    </main>
  );
}
