"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import BrandIcon from "@/components/common/BrandIcon";

export default function ContactBanner() {
  const { t } = useLanguage();
  const pathname = usePathname();

  // Hide on mobile for collection and contact pages to avoid overlap with sticky bar
  const shouldHideOnMobile = pathname?.includes('/collection') || pathname?.includes('/contact-us');

  return (
    <motion.div 
       initial={{ y: 50, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
        className={`relative z-20 w-full bg-emerald text-white overflow-hidden shadow-md border-t border-emerald-light/30 border-b border-emerald/50 mt-auto ${shouldHideOnMobile ? 'hidden md:block' : 'block'}`}
    >
      {/* Inner Content */}
      <div className="w-full max-w-7xl mx-auto px-4 py-4 md:py-0 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 md:h-[70px]">
        
        {/* Logo & Identity */}
        <div className="flex justify-center items-center gap-3 shrink-0">
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner p-1 relative overflow-hidden shrink-0">
             <BrandIcon className="w-full h-full relative z-10" />
           </div>
           <div className="flex flex-col justify-center text-center md:text-left">
             <h2 className="text-lg md:text-2xl font-black tracking-wider drop-shadow-md leading-none mb-1">
               {t.banner?.title || "AKL独家私人定制 高端资源"}
             </h2>
             <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold opacity-90 drop-shadow-sm font-sans">
               {t.banner?.subtitle || "你的首选 • 轻奢之家"}
             </p>
           </div>
        </div>

        {/* Middle Contact Block */}
        <div className="relative flex flex-col items-center justify-center px-6 md:px-10 w-full md:w-auto h-auto md:h-full md:mx-auto py-4 md:py-0">
          <div className="absolute inset-y-0 -left-6 -right-6 bg-emerald-light -skew-x-[25deg] shadow-inner hidden md:block" />
          <div className="absolute inset-0 bg-emerald-light/30 md:hidden rounded-2xl mx-2 my-1 border border-white/20" />
          
          <div className="relative z-10 flex flex-col items-center gap-2 w-full">
             <a href="tel:+64221620017" className="flex items-center gap-3 hover:text-white/80 transition-colors text-base md:text-lg font-black tracking-widest drop-shadow-md">
               <span className="opacity-70 text-[10px] md:text-xs font-bold font-sans min-w-[3em] text-right">{t.banner?.phone}</span> 
               <span>0221620017</span>
             </a>
              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-[13px] md:text-base font-black tracking-widest drop-shadow-md">
                <div className="flex items-center gap-3">
                  <span className="opacity-70 text-[9px] md:text-xs font-bold font-sans uppercase tracking-[0.2em]">{t.banner?.wechat}</span> 
                  <span>BX20220927 / Soulful990</span>
                </div>
              </div>
              <a href="https://t.me/NZHB_Today90" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white/80 transition-colors text-[13px] md:text-base font-black tracking-widest drop-shadow-md">
                <span className="opacity-70 text-[9px] md:text-xs font-bold font-sans uppercase tracking-[0.2em]">Telegram频道</span>
                <span>NZHB_Today90</span>
              </a>
          </div>
        </div>

        {/* Slogan */}
        <div className="hidden md:flex flex-col text-center md:text-right justify-center shrink-0 md:pl-4 mb-4 md:mb-0">
           <p className="text-[10px] md:text-xl font-black tracking-[0.3em] md:tracking-[0.5em] leading-none mb-1.5 drop-shadow-md text-white/90">
             {t.banner?.slogan1 || "品 味 顶 奢 之 夜"}
           </p>
           <p className="text-[8px] md:text-[13px] font-bold tracking-[0.3em] md:tracking-[0.4em] opacity-90 drop-shadow-sm font-sans">
             {t.banner?.slogan2 || "纵 享 倾 城 绝 色"}
           </p>
        </div>
        
      </div>
    </motion.div>
  );
}
