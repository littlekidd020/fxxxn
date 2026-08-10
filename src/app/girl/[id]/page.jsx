"use client";

export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { girls } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft,
  Calendar, 
  Globe, 
  Ruler, 
  Weight, 
  Heart,
  Play,
  Banknote,
  Sparkles,
  MessageCircle,
  MessageSquare,
  Send,
  MapPin,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import TrustVideo from "@/components/girl/TrustVideo";
import WeChatQRModal from "@/components/common/WeChatQRModal";
import ImageModal from "@/components/common/ImageModal";

const StatItem = ({ icon: Icon, label, value, t }) => {
  const displayValue = typeof value === 'string' ? value.replace("(Natural)", t.girl.natural) : value;
  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white/60 border border-zen shadow-sm backdrop-blur-sm hover:border-emerald/50 transition-colors">
      <div className="flex items-center gap-2 text-emerald">
        <Icon size={18} className="text-emerald" />
        <span className="text-xs uppercase tracking-widest font-sans text-[#2A2A2A]/50">{label}</span>
      </div>
      <p className="text-2xl font-serif text-[#2A2A2A] font-playfair">{displayValue}</p>
    </div>
  );
};

export default function GirlDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [model, setModel] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    const foundModel = girls.find((m) => m.id === parseInt(id));
    if (foundModel && foundModel.status !== "hidden" && foundModel.status !== "deleted") {
      setModel(foundModel);
    } else {
      router.push('/collection'); // redirect if not found or hidden
    }
  }, [id, router]);

  if (!model) return <div className="min-h-screen bg-noir" />;

  const isAvailable = model.status === "available";
  const allImages = model ? [model.image, ...(model.gallery || [])] : [];

  const openImageModal = (idx) => {
    setImageIdx(idx);
    setSelectedImage(true);
  };

  const nextImage = () => setImageIdx((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <main className="min-h-screen bg-noir pb-12 md:pb-32">
      {/* Main Content Grid */}
      <section className="px-8 max-w-7xl mx-auto pt-28 lg:pt-52 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-16">
        
        {/* Left Column: Info & Stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Header Info */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Name row with back button + location aligned to bottom */}
            <div className="flex items-end gap-4 mb-4">
              {/* Back + Location */}
              <div className="flex flex-col items-start gap-2 shrink-0">
                <button 
                  onClick={() => router.back()}
                  className="p-2.5 bg-white/60 backdrop-blur-xl border border-zen shadow-sm rounded-full text-[#2A2A2A] hover:bg-emerald/10 hover:text-emerald transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                {model.location && (
                  <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-emerald/30 px-4 py-1.5 rounded-full shadow-sm">
                    <MapPin size={14} className="text-emerald" />
                    <span className="text-[10px] uppercase tracking-widest font-sans text-[#2A2A2A] font-bold">
                      {t.girl.locations[model.location] || model.location}
                    </span>
                  </div>
                )}
              </div>
              {/* Name */}
              <h1 className={`${lang === 'en' ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'} font-serif text-emerald font-bold font-playfair tracking-wide relative inline-block whitespace-nowrap`}>
                {model.name[lang] || model.name.en}
                <span className={`absolute -top-3 -right-2 translate-x-full inline-flex items-center px-2.5 py-1 rounded-full text-[11.5px] font-bold font-sans tracking-wider bg-white/80 border border-zen shadow-sm ${isAvailable ? 'text-emerald' : 'text-[#2A2A2A]/30'}`}>
                  {isAvailable ? t.girl.available : t.girl.unavailable}
                </span>
              </h1>
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald font-bold font-sans mt-2">
              {t.girl.nationalities[model.stats.nationality] || model.stats.nationality}
              {model.stats.age && ` • ${model.stats.age}${t.girl.ageUnit}`}
            </p>

            {/* About Section */}
            <div className="mt-8 space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-emerald font-bold font-sans flex items-center gap-2">
                <MessageCircle size={10} fill="#9C7C3C" className="text-emerald"/> {t.girl.about}
              </h4>
              <p className="text-[#2A2A2A]/70 leading-relaxed font-sans text-base tracking-wide border-l-2 border-emerald/40 pl-4 py-1">
                {model.description && typeof model.description === 'object' ? (model.description[lang] || model.description.en) : (model.description || "A dedicated professional offering a personalized and refined experience. Expertly trained in various techniques to ensure your absolute relaxation and satisfaction.")}
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {model.stats.age && <StatItem icon={Calendar} label={t.girl.age} value={model.stats.age} t={t} />}
            <StatItem icon={Ruler} label={t.girl.height} value={model.stats.height} t={t} />
            <StatItem icon={Weight} label={t.girl.weight} value={model.stats.weight} t={t} />
            <StatItem icon={Heart} label={t.girl.breast} value={model.stats.cup} t={t} />
          </div>

          {/* Price & Services Block */}
          <div className="p-8 rounded-3xl bg-white/60 border border-zen shadow-sm backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
            
            <div className="relative space-y-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-emerald font-bold font-sans flex items-center gap-2 mb-2">
                  <Banknote size={12} className="text-emerald" /> {t.girl.price || "Price"}
                </h4>
                <div className="flex flex-col gap-3">
                  {model.price.split("·").map((rate, i) => {
                    const parts = rate.split("/");
                    const amount = parts[0];
                    const unit = parts[1];
                    const trimmedUnit = unit?.trim();
                    const translatedUnit = t.girl.units[trimmedUnit] || trimmedUnit;
                    return (
                      <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className="text-3xl sm:text-4xl font-serif text-[#2A2A2A] font-playfair leading-tight">
                          {amount.trim()}
                        </span>
                        <span className="text-sm sm:text-base uppercase tracking-widest font-sans text-[#2A2A2A]/50 italic whitespace-nowrap">
                          / {unit ? translatedUnit : t.girl.perHour.replace("/", "").trim()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full h-px bg-zen" />

              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-emerald font-bold font-sans flex items-center gap-2 mb-4">
                  <Sparkles size={12} className="text-emerald" /> {t.girl.services || "Featured Services"}
                </h4>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[#2A2A2A]/80 leading-relaxed font-sans text-base">
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
                    
                    if (model.extras && extra.length === 0) {
                      const extrasList = Array.isArray(model.extras) ? model.extras : (model.extras[lang] || model.extras.en || []);
                      if (extrasList.length > 0) {
                        const prefix = lang === 'cn' ? '额外: ' : 'Extra: ';
                        const firstItem = extrasList[0];
                        const startsWithPrefix = firstItem.startsWith('额外') || firstItem.startsWith('Extra');
                        const combinedExtras = (startsWithPrefix ? '' : prefix) + extrasList.join(' ');
                        extra.push(combinedExtras);
                      }
                    }
                    
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
                             
                             const isSpecial = isExtraGroup || isVipGroup;
                             const showDot = !isSpecial && ((!isLastInGroup && !s.endsWith(":") && !s.endsWith("：")) || (isLastInGroup && isNextGroupOnSameLine));
                             
                             return (
                               <span key={`${groupIdx}-${sIdx}`} className="inline max-w-full">
                                 <span className="whitespace-normal break-words">
                                   {s.includes('(') ? s.split(',').join(', ') : s}
                                 </span>
                                 {showDot && <span className="mx-2 text-[#2A2A2A]/30 inline-block">·</span>}
                               </span>
                             );
                           })}
                         </React.Fragment>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Video */}
          {model.video && (
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-emerald font-bold font-sans flex items-center gap-2">
                <Play size={10} fill="#9C7C3C" className="text-emerald"/> {t.grid.verification}
              </h4>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <TrustVideo 
                  src={model.video} 
                  poster={model.image} 
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Photo Gallery */}
        <div className="lg:col-span-8 space-y-8 mt-4 lg:mt-0">
          <h3 className="text-2xl font-serif text-[#2A2A2A] italic font-playfair tracking-wide border-b border-zen pb-4">
            {t.girl.portfolio}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => openImageModal(0)}
              className="relative aspect-[3/4] md:col-span-2 rounded-3xl overflow-hidden shadow-lg group cursor-zoom-in"
            >
              <img 
                src={model.image} 
                alt={`${model.name.en} Portfolio Main`} 
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-emerald/10 mix-blend-overlay" />
              <div className="absolute inset-0 border border-emerald/0 group-hover:border-emerald/30 transition-all duration-700 m-4 rounded-2xl pointer-events-none" />
            </div>

            {model.gallery?.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => openImageModal(idx + 1)}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-lg group cursor-zoom-in"
              >
                <img 
                  src={img} 
                  alt={`${model.name.en} Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-emerald/10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Fixed Sticky CTA Bottom Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-2xl border-t border-zen p-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="hidden md:block">
            <p className="font-serif italic text-[#2A2A2A] text-xl">{model.name[lang] || model.name.en}</p>
            <p className="text-[10px] text-emerald uppercase tracking-widest font-bold">{t.girl.availableToBook}</p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto items-center gap-3 md:gap-4">
            <a 
              href={`https://wa.me/64221620017?text=${t.girl.contactMsg.replace("[name]", model.name.en)}`}
              target="_blank"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-emerald text-white rounded-xl hover:bg-emerald-light transition-all transform hover:scale-[1.02] shadow-md min-w-[120px]"
            >
              <MessageCircle size={18} />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold font-sans">{t.girl.whatsapp}</span>
            </a>

            <button 
              onClick={() => setShowQR(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-emerald text-white rounded-xl hover:bg-emerald-light transition-all transform hover:scale-[1.02] shadow-md min-w-[120px]"
            >
              <MessageSquare size={18} />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold font-sans">{t.girl.wechat}</span>
            </button>
            
            <a 
              href={`https://t.me/NZHB00?text=Inquiry for ${model.name.en}`}
              target="_blank"
              className="flex items-center justify-center p-4 bg-noir-soft border border-zen text-[#2A2A2A] shadow-sm rounded-xl hover:bg-zen hover:text-emerald transition-colors"
            >
              <Send size={18} />
            </a>
          </div>
        </div>
      </motion.div>

      <WeChatQRModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
      />
      <ImageModal 
        isOpen={selectedImage}
        onClose={() => setSelectedImage(false)}
        images={allImages}
        currentIndex={imageIdx}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </main>
  );
}
