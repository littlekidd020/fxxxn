"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "@/components/common/BrandLogo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[70] flex flex-col transition-all duration-500">
      {/* Opening Hours Top Bar */}
      <div className={`flex justify-center py-1.5 md:py-3 border-b border-emerald/10 transition-colors duration-500 ${scrolled ? 'bg-noir/90 backdrop-blur-md' : 'bg-noir-soft/80 backdrop-blur-sm'}`}>
        <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-sans font-bold text-emerald text-center px-4">
          {t.nav.hours}
        </span>
      </div>

      <nav className={`w-full px-6 md:px-8 py-4 md:py-8 flex items-center justify-between transition-all duration-500 border-b border-emerald/10 ${
        scrolled ? "bg-noir/90 backdrop-blur-xl border-zen shadow-lg md:py-4" : "bg-transparent md:py-10"
      }`}>
      <Link href="/" className="flex items-center group">
        <div className="relative w-28 h-12 md:w-48 md:h-20">
          <BrandLogo className="w-full h-full" />
        </div>
      </Link>
      
      {/* Desktop Links & Lang Toggle */}
      <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-sans text-[#2A2A2A]/70 font-semibold">
        <Link href="/collection" className="hover:text-emerald transition-colors tracking-widest">{t.nav.collection}</Link>
        <Link href="/contact-us" className="hover:text-emerald transition-colors tracking-widest">{t.nav.concierge}</Link>
        
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-5 py-2 bg-emerald/5 border border-emerald/30 rounded-full hover:bg-emerald/10 hover:border-emerald transition-all text-[#2A2A2A] group shadow-sm"
        >
          <Globe size={16} className="text-emerald" />
          <span className="font-bold tracking-widest">{lang === "cn" ? "EN" : "中文"}</span>
        </button>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-1.5 bg-emerald/5 border border-emerald/20 rounded-full text-xs font-bold text-[#2A2A2A]"
        >
          {lang === "cn" ? "EN" : "中文"}
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-emerald/80 hover:text-emerald transition-colors relative z-[80]"
        >
          <Menu size={24} />
        </button>
      </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-noir/95 backdrop-blur-xl z-[75] transition-all duration-500 flex flex-col items-center justify-center gap-12 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-8 text-2xl font-serif tracking-widest italic font-playfair">
          <Link href="/collection" onClick={() => setIsOpen(false)} className="text-[#2A2A2A] hover:text-emerald transition-colors">
            {t.nav.collection}
          </Link>
          <Link href="/contact-us" onClick={() => setIsOpen(false)} className="text-[#2A2A2A] hover:text-emerald transition-colors">
            {t.nav.concierge}
          </Link>
        </div>
        
        <button 
          onClick={() => { toggleLang(); setIsOpen(false); }}
          className="flex items-center gap-3 px-8 py-3 bg-emerald text-white rounded-full font-bold tracking-widest shadow-lg"
        >
          <Globe size={20} className="text-white" />
          <span>{lang === "cn" ? "SWITCH TO ENGLISH" : "切换至中文"}</span>
        </button>

        <button 
          onClick={() => setIsOpen(false)}
          className="mt-12 text-[#2A2A2A]/50 text-xs uppercase tracking-[0.5em] font-sans font-bold hover:text-[#2A2A2A] transition-colors"
        >
          CLOSE [X]
        </button>
      </div>
    </header>
  );
};

export default Navbar;
