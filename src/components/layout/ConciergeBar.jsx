"use client";

import React from "react";
import { Phone, MessageSquare, Send, MessageCircle, MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import WeChatQRModal from "../common/WeChatQRModal";

const ConciergeBar = () => {
  const { t } = useLanguage();
  const [showQR, setShowQR] = React.useState(false);

  return (
    <>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 bg-noir-soft/90 backdrop-blur-xl border border-gold/20 shadow-[0_15px_40px_rgba(184,134,11,0.15)] rounded-full flex items-center gap-5 md:gap-10"
    >
      <a href="tel:+64221620017" className="flex flex-col items-center gap-1 group">
        <div className="p-2 rounded-full group-hover:bg-emerald/10 transition-colors">
          <Phone size={20} className="text-emerald" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-emerald/80 group-hover:text-emerald transition-colors font-sans whitespace-nowrap">{t.concierge.sticky.call}</span>
      </a>
      
      <a href="https://wa.me/64221620017" className="flex flex-col items-center gap-1 group">
        <div className="p-2 rounded-full group-hover:bg-emerald/10 transition-colors">
          <MessageSquare size={20} className="text-emerald" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-emerald/80 group-hover:text-emerald transition-colors font-sans whitespace-nowrap">{t.concierge.sticky.whatsapp}</span>
      </a>
      
      <a href="https://t.me/NZHB00" className="flex flex-col items-center gap-1 group">
        <div className="p-2 rounded-full group-hover:bg-emerald/10 transition-colors">
          <Send size={20} className="text-emerald" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-emerald/80 group-hover:text-emerald transition-colors font-sans whitespace-nowrap">{t.concierge.sticky.telegram}</span>
      </a>

      <a 
        onClick={(e) => {
          e.preventDefault();
          setShowQR(true);
        }}
        href="#" 
        className="flex flex-col items-center gap-1 group"
      >
        <div className="p-2 rounded-full group-hover:bg-emerald/10 transition-colors">
          <MessageCircle size={20} className="text-emerald" />
        </div>
        <span className="text-[9px] uppercase tracking-wider text-emerald/80 group-hover:text-emerald transition-colors font-sans whitespace-nowrap">{t.concierge.sticky.wechat}</span>
      </a>
    </motion.div>

    <WeChatQRModal 
      isOpen={showQR} 
      onClose={() => setShowQR(false)} 
    />
    </>
  );
};

export default ConciergeBar;
