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
      {/* Cinematic Erotic Hero Banner */}
      <header className="relative w-full h-[270px] md:h-[400px] flex flex-col justify-end -mt-32 mb-12 overflow-hidden">
        {/* Background Sensual Image */}
        <div className="absolute inset-0 z-0 bg-noir">
          <img 
            src="/images/header-bg-custom.webp" 
            alt="Sensual Boutique Background" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-emerald/5 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir via-noir/20 to-noir" />
        </div>
        <ContactBanner />
      </header>
      
      {/* Model Grid Section */}
      <GirlGrid 
        limit={3} 
        showCTA={true} 
        showIntro={true} 
      />

      {/* Trust & Quality Footer Callout */}
      <section className="relative px-8 py-32 mt-32 border-y border-emerald/20 overflow-hidden">
        {/* Background Erotic Image for Text Block */}
        <div className="absolute inset-0 z-0 bg-noir">
          <img 
            src="/images/footer-bg-custom.webp" 
            alt="Custom Erotic Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-emerald/5 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/40 to-noir/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 bg-noir-soft/80 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <h3 className="text-3xl font-serif text-emerald tracking-wide font-bold font-playfair drop-shadow-sm">{t.grid.standard}</h3>
          <p className="text-white/70 leading-relaxed font-sans max-w-2xl mx-auto text-sm">
            {t.grid.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-emerald uppercase tracking-widest text-[11px] font-bold drop-shadow-md">
            <span className="border-b border-emerald/50 pb-2">{t.grid.verification}</span>
            <span className="border-b border-emerald/50 pb-2">{t.grid.discreet}</span>
            <span className="border-b border-emerald/50 pb-2">{t.grid.vip}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
