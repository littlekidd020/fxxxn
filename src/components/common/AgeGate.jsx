"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import BrandLogo from '@/components/common/BrandLogo';

const AgeGate = ({ children }) => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const isVerified = sessionStorage.getItem('age-verified');
    if (isVerified) {
      setVerified(true);
    }
    setLoading(false);
  }, []);

  const handleVerify = () => {
    sessionStorage.setItem('age-verified', 'true');
    setVerified(true);
  };

  if (loading) return null;

  return (
    <>
      <AnimatePresence>
        {!verified && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="fixed inset-0 z-[200] bg-noir flex flex-col font-sans overflow-hidden"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-noir-soft">
               <motion.img 
                 initial={{ scale: 1.15 }}
                 animate={{ scale: 1.05 }}
                 transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                 src="/images/landing-bg-erotic-new.webp" 
                 className="w-full h-full object-cover object-center opacity-60"
                 alt="Luxury Entry"
               />
               <div className="absolute inset-0 bg-emerald/25 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-b from-noir/90 via-transparent to-noir" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                className="max-w-2xl w-full text-center space-y-12"
              >
                 {/* Brand Logo Identity */}
                 <div className="flex flex-col items-center gap-8 mt-12 md:mt-24">
                     <motion.div 
                       initial={{ scale: 0.8, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 0.8, duration: 1.5 }}
                       className="w-48 h-20 md:w-80 md:h-32 flex items-center justify-center relative group"
                     >
                        <BrandLogo className="w-full h-full" />
                     </motion.div>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald/30 to-transparent" />
                 </div>

                 {/* Welcome Message Box */}
                 <div className="bg-white/70 backdrop-blur-2xl border border-zen p-8 md:p-16 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative overflow-hidden">
                    {/* Luxury Gradient Accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald/50 to-transparent" />
                    
                    <h1 className="text-5xl md:text-7xl font-serif text-emerald italic font-playfair tracking-normal mb-8 leading-tight">
                      {t.ageGate.welcome}
                    </h1>
                    
                    <p className="text-[#2A2A2A]/60 text-xs md:text-sm leading-relaxed max-w-md mx-auto font-sans tracking-[0.1em] uppercase">
                      {t.ageGate.message}
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                       <button
                         onClick={handleVerify}
                         className="group relative px-10 py-5 bg-transparent border border-emerald/30 hover:border-emerald/50 rounded-2xl overflow-hidden transition-all duration-500 w-full sm:w-auto min-w-[200px] shadow-sm"
                       >
                          <span className="relative z-10 text-[#2A2A2A] font-serif italic text-xl tracking-widest group-hover:text-white transition-colors">
                            {t.ageGate.buttonEn}
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald to-emerald-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-90" />
                       </button>

                       <button
                         onClick={handleVerify}
                         className="group relative px-10 py-5 bg-noir-soft border border-zen hover:border-emerald/30 rounded-2xl overflow-hidden transition-all duration-500 w-full sm:w-auto min-w-[200px]"
                       >
                          <span className="relative z-10 text-[#2A2A2A]/70 font-sans font-bold text-xs md:text-sm tracking-[0.2em] group-hover:text-[#2A2A2A] transition-colors">
                            {t.ageGate.buttonCn}
                          </span>
                          <span className="absolute inset-0 bg-zen/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </button>
                    </div>
                 </div>

                 {/* Disclaimer */}
                 <p className="text-[9px] uppercase tracking-[0.5em] text-emerald/70 font-bold max-w-lg mx-auto leading-loose px-4">
                    Step into a world of bespoke luxury. By entering, you confirm you are of legal age to view such content.
                 </p>
              </motion.div>
            </div>

            {/* Global Footer */}
            <div className="relative z-10 p-10 text-center">
               <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-emerald/60 font-bold font-sans">
                 {t.ageGate.footer}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {(verified || loading) && children}
    </>
  );
};

export default AgeGate;
