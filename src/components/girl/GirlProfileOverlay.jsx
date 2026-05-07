"use client";

import React, { useEffect, useState } from "react";
import ImageModal from "../common/ImageModal";
import { 
  X, 
  Ruler, 
  Weight, 
  Globe, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Send,
  Play,
  Heart,
  Sparkles,
  Banknote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TrustVideo from "./TrustVideo";
import { useLanguage } from "@/context/LanguageContext";

const GirlProfileOverlay = ({ model, onClose, onNext, onPrev }) => {
  const { t, lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const allImages = model ? [model.image, ...(model.gallery || [])] : [];

  // Prevent scrolling when profile is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  if (!model) return null;

  const StatItem = ({ icon: Icon, label, value }) => {
    const displayValue = typeof value === 'string' ? value.replace("(Natural)", t.girl.natural) : value;
    return (
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 text-[#C5A059]">
          <Icon size={16} />
          <span className="text-[10px] uppercase tracking-widest font-sans text-[#15030A]/50">{label}</span>
        </div>
        <p className="text-xl font-serif text-[#15030A] font-playfair">{displayValue}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-end">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1f050f]/80 backdrop-blur-sm"
      />

      {/* Profile Sidebar */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-full bg-[#0A0A0A] border-l border-[#008000]/10 shadow-2xl flex flex-col pointer-events-auto"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-2 bg-white/60 hover:bg-white/80 rounded-full text-[#15030A] transition-all border border-white/80 shadow-sm"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px] max-h-[450px] w-full overflow-hidden shrink-0 group/profile">
          <img 
            src={model.image} 
            alt={model.name} 
            onClick={() => setSelectedImage(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/profile:scale-110 cursor-zoom-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
          
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between opacity-0 group-hover/profile:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="p-3 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full text-[#15030A] hover:bg-[#008000] hover:text-white transition-colors shadow-sm"
            >
               <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="p-3 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full text-[#15030A] hover:bg-[#008000] hover:text-white transition-colors shadow-sm"
            >
               <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-8 left-8">
            <h2 className="text-5xl font-serif italic text-[#15030A] mb-2 font-playfair">{model.name}</h2>
            <div className="flex items-center gap-3">
               <span className="h-2 w-2 rounded-full bg-[#008000]"></span>
               <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#008000] font-bold">
                 {t.girl.available}
               </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 no-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            {model.stats.age && <StatItem icon={Calendar} label={t.girl.age} value={model.stats.age} />}
            <StatItem icon={Globe} label={t.girl.nationality} value={t.girl.nationalities[model.stats.nationality] || model.stats.nationality} />
            <StatItem icon={Ruler} label={t.girl.height} value={model.stats.height} />
            <StatItem icon={Weight} label={t.girl.weight} value={model.stats.weight} />
            <StatItem icon={Heart} label={t.girl.breast} value={model.stats.cup} />
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#008000] font-bold font-sans flex items-center gap-2">
              <Play size={10} fill="#008000" /> {t.grid.verification}
            </h4>
            <TrustVideo 
              src={model.video || "https://joy1.videvo.net/videvo_files/video/premium/getty_14/1080p/201211_076_Woman_In_Silk_Robe_1_1080p.mp4"} 
              poster={model.image} 
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#008000] font-bold font-sans flex items-center gap-2">
              <Banknote size={10} className="text-[#008000]" /> {t.girl.price || "Price"}
            </h4>
            <div className="flex flex-col gap-2">
              {model.price.split("·").map((rate, i) => {
                const parts = rate.split("/");
                const amount = parts[0];
                const unit = parts[1];
                const trimmedUnit = unit?.trim();
                const translatedUnit = t.girl.units[trimmedUnit] || trimmedUnit;
                return (
                  <p key={i} className="text-2xl font-serif text-[#15030A] font-playfair leading-tight flex items-baseline">
                    {amount.trim()}
                    <span className="text-sm uppercase tracking-widest font-sans text-[#15030A]/50 italic ml-4">
                      / {unit ? translatedUnit : t.girl.perHour.replace("/", "").trim()}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#008000] font-bold font-sans flex items-center gap-2">
              <Sparkles size={10} className="text-[#008000]" /> {t.girl.services || "Services"}
            </h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#15030A]/80 leading-relaxed font-sans text-base">
              {(() => {
                if (!model.services) return null;
                const main = [];
                const extra = [];
                const vip = [];
                
                const services = model.services ? (Array.isArray(model.services) ? model.services : (model.services[lang] || model.services.en || [])) : [];

                services.forEach(group => {
                  if (group.startsWith("VIP:") || group.startsWith("VIP：")) vip.push(group);
                  else if (group.includes("额外") || group.startsWith("Extra:") || group.startsWith("Extra：") || group.startsWith("Extra ") || group.startsWith("Note:") || group.startsWith("Note：")) extra.push(group);
                  else if (group.startsWith("免费赠送:")) extra.push(group);
                  else main.push(group);
                });
                
                const sortedGroups = [...main, ...extra, ...vip];
                
                return sortedGroups.map((group, groupIdx, groups) => {
                  const servicesInGroup = group.split(" ");
                  const isVipGroup = group.startsWith("VIP:") || group.startsWith("VIP：");
                  const isExtraGroup = group.includes("额外") || group.startsWith("免费赠送:") || group.startsWith("Extra:") || group.startsWith("Extra：") || group.startsWith("Extra ") || group.startsWith("Note:") || group.startsWith("Note：");
                  
                  return (
                    <React.Fragment key={groupIdx}>
                      {(isVipGroup || isExtraGroup) && <div className="w-full h-0" />}
                      {servicesInGroup.map((s, sIdx) => {
                        const isLastInGroup = sIdx === servicesInGroup.length - 1;
                        const isNextGroupOnSameLine = groupIdx < groups.length - 1 && !groups[groupIdx+1].startsWith("VIP:") && !groups[groupIdx+1].includes("额外") && !groups[groupIdx+1].startsWith("免费赠送:") && !groups[groupIdx+1].startsWith("Note:") && !groups[groupIdx+1].startsWith("Note：");
                        
                        const showDot = (!isLastInGroup && !s.endsWith(":") && !s.endsWith("：")) || (isLastInGroup && isNextGroupOnSameLine);
                        
                        return (
                          <span key={`${groupIdx}-${sIdx}`} className="inline max-w-full">
                            <span className="whitespace-normal break-words">
                              {s.includes('(') ? s.split(',').join(', ') : s}
                            </span>
                            {showDot && <span className="mx-2 text-[#15030A]/30 inline-block">·</span>}
                          </span>
                        );
                      })}
                    </React.Fragment>
                  );
                });
              })()}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-[#008000] font-bold font-sans">{t.girl.about}</h4>
            <p className="text-[#15030A]/70 leading-relaxed font-sans text-sm">
              {model.description || "A dedicated professional offering a personalized and refined experience. Expertly trained in various techniques to ensure your absolute relaxation and satisfaction."}
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="grid grid-cols-1 gap-4 pt-4 pb-12">
            <a 
              href={`https://wa.me/64221620017?text=${t.girl.contactMsg.replace("[name]", model.name)}`}
              target="_blank"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#008000] text-white rounded-xl hover:bg-[#16A34A] transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              <span className="text-xs uppercase tracking-[0.2em] font-bold font-sans">{t.girl.whatsapp}</span>
            </a>
            
            <a 
              href={`https://t.me/LOVE0221620017?text=Inquiry for ${model.name}`}
              target="_blank"
              className="flex items-center justify-center gap-3 w-full py-4 bg-white/60 border border-white/80 text-[#15030A] rounded-xl hover:bg-white/80 transition-colors shadow-sm"
            >
              <Send size={18} />
              <span className="text-xs uppercase tracking-[0.2em] font-bold font-sans">{t.girl.telegram}</span>
            </a>
          </div>
        </div>
        <ImageModal
          isOpen={selectedImage}
          onClose={() => setSelectedImage(false)}
          images={allImages}
          currentIndex={0}
          onNext={() => {}}
          onPrev={() => {}}
        />
      </motion.div>
    </div>
  );
};

export default GirlProfileOverlay;
