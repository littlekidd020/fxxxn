"use client";

import React from "react";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Clock, 
  ShieldCheck, 
  MapPin 
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ContactBanner from "@/components/layout/ContactBanner";

const ConciergePage = () => {
  const { t } = useLanguage();

  const Feature = ({ icon: Icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-white/60 border border-zen shadow-sm backdrop-blur-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center text-emerald">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-serif text-[#2A2A2A] font-playfair">{title}</h3>
      <p className="text-sm text-[#2A2A2A]/60 leading-relaxed font-sans">{desc}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-noir pt-44 transition-colors duration-700">
      
      {/* Header Banner */}
      <header className="relative w-full h-[220px] md:h-[450px] flex flex-col justify-end -mt-44 mb-6 md:mb-12 overflow-hidden border-b border-zen bg-noir-soft">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-noir-soft">
          <img 
            src="/images/header-bg-custom.webp" 
            alt="Sensual Concierge Background" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-emerald/25 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/90 via-transparent to-noir" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 mt-28 md:mt-12 mb-6 max-w-4xl mx-auto w-full text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold font-playfair tracking-wider">
            {t.concierge.title.includes(' ') ? (
              <>
                <span className="text-[#2A2A2A]">{t.concierge.title.split(' ')[0]}</span>{' '}
                <span className="text-emerald">{t.concierge.title.split(' ')[1]}</span>
              </>
            ) : (
              <span className="text-emerald">{t.concierge.title}</span>
            )}
          </h1>
          <p className="hidden md:block text-[#2A2A2A]/70 leading-relaxed font-sans text-xs md:text-sm mt-8 max-w-2xl mx-auto px-6">
            {t.concierge.subtitle}
          </p>
        </div>

        <ContactBanner />
      </header>

      <section className="max-w-7xl mx-auto py-8 md:py-16 px-8">

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <Feature 
            icon={Clock} 
            title={t.concierge.feat1Title} 
            desc={t.concierge.feat1Desc}
          />
          <Feature 
            icon={ShieldCheck} 
            title={t.concierge.feat2Title} 
            desc={t.concierge.feat2Desc}
          />
          <Feature 
            icon={MapPin} 
            title={t.concierge.feat3Title} 
            desc={t.concierge.feat3Desc}
          />
        </div>

        {/* Contact Funnel Section */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-emerald/5 blur-3xl rounded-full" />
          <div className="relative p-12 bg-white/70 border border-zen backdrop-blur-3xl text-center flex flex-col items-center shadow-sm">
            <h2 className="text-3xl font-serif text-[#2A2A2A] mb-8 font-playfair tracking-wide italic">{t.concierge.ctaTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <a 
                href="https://wa.me/64221620017"
                className="flex items-center justify-center gap-3 py-4 bg-emerald text-white rounded-xl hover:bg-emerald-light transition-all transform hover:scale-105 shadow-md"
              >
                <MessageCircle size={20} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans">WhatsApp</span>
              </a>
              <a 
                href="https://t.me/NZHB00"
                className="flex items-center justify-center gap-3 py-4 bg-noir-soft border border-zen text-[#2A2A2A] rounded-xl hover:bg-zen hover:text-emerald transition-all transform hover:scale-105"
              >
                <Send size={18} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans">Telegram</span>
              </a>
              <div className="flex items-center justify-center gap-3 py-4 bg-noir-soft border border-zen text-[#2A2A2A] rounded-xl hover:bg-zen hover:text-emerald transition-all transform hover:scale-105 cursor-pointer col-span-1 sm:col-span-2">
                <span className="text-[10px] uppercase tracking-widest text-emerald font-bold font-sans">{t.banner.wechat}</span>
                <span className="text-[13px] md:text-lg uppercase tracking-[0.2em] font-black font-sans">Soulful95</span>
              </div>
              <a 
                href="tel:0221620017"
                className="flex items-center justify-center gap-3 py-4 bg-noir-soft border border-zen text-[#2A2A2A] rounded-xl hover:bg-zen hover:text-emerald transition-all transform hover:scale-105"
              >
                <Phone size={18} />
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold font-sans">022 162 0017</span>
              </a>
            </div>
            <p className="mt-8 text-[10px] text-[#2A2A2A]/40 uppercase tracking-[0.3em] font-sans italic">
              {t.concierge.ctaEncrypted}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConciergePage;
