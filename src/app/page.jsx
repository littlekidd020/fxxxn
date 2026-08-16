"use client";

import GirlGrid from "@/components/girl/GirlGrid";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle } from "lucide-react";
import ContactBanner from "@/components/layout/ContactBanner";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-noir overflow-x-hidden pt-44 transition-all duration-700">
      {/* Cinematic Hero Banner */}
      <header className="relative w-full min-h-[480px] md:min-h-0 md:h-[400px] flex flex-col justify-end -mt-44 mb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-noir-soft">
          <img 
            src="/images/header-bg-custom.webp" 
            alt="Sensual Boutique Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-emerald/25 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/90 via-transparent to-noir" />
        </div>
        <ContactBanner />
      </header>
      
      {/* Model Grid Section */}
      <GirlGrid 
        limit={6} 
        showCTA={true} 
        showIntro={true} 
      />

      {/* Trust & Quality Footer Callout */}
      <section className="relative px-8 py-32 mt-32 border-y border-zen overflow-hidden">
        {/* Background Image for Text Block */}
        <div className="absolute inset-0 z-0 bg-noir-soft">
          <img 
            src="/images/footer-bg-custom.webp" 
            alt="Custom Background" 
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-emerald/25 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/90 via-noir/20 to-noir/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-zen shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <h3 className="text-3xl font-serif text-emerald tracking-wide font-bold font-playfair drop-shadow-sm">{t.grid.standard}</h3>
          <p className="text-[#2A2A2A]/70 leading-relaxed font-sans max-w-2xl mx-auto text-sm">
            {t.grid.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-emerald uppercase tracking-widest text-[11px] font-bold">
            <span className="border-b border-emerald/50 pb-2">{t.grid.verification}</span>
            <span className="border-b border-emerald/50 pb-2">{t.grid.discreet}</span>
            <span className="border-b border-emerald/50 pb-2">{t.grid.vip}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
