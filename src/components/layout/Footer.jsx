"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "@/components/common/BrandLogo";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="px-8 pt-10 md:pt-24 pb-24 flex flex-col items-center gap-6 text-center text-white/60 uppercase tracking-[0.5em] font-sans border-t border-emerald/20 bg-noir">
      <div className="flex flex-col items-center gap-6">
        <div className="h-px w-12 bg-emerald/30" />
        <BrandLogo className="w-12 h-12 opacity-50 hover:opacity-100 transition-opacity duration-700" />
        <p className="tracking-[0.3em] font-bold text-emerald/60 text-xs md:text-sm">
          {t.nav.hours}
        </p>
        <div className="h-px w-12 bg-emerald/30" />
      </div>
      
      <div className="space-y-4">
        <p className="text-[10px] md:text-xs font-medium tracking-[0.4em]">
          &copy; 2026 {t.hero.title}. All Rights Reserved.
        </p>
        <p className="text-[9px] text-white/40 tracking-[0.2em] font-bold">
          High-End Bespoke Service &middot; Secure & Discreet
        </p>
      </div>
    </footer>
  );
};

export default Footer;
