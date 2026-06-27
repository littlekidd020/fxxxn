import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, Volume2, VolumeX, X, Maximize2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const TrustVideo = ({ src, poster }) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  // Ensure portal target exists (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync mute state between preview and modal
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Modal content rendered via portal
  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl"
          style={{ zIndex: 99999 }}
          onClick={closeModal}
        >
          {/* Close Button - always visible */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fixed top-3 right-3 flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-xl rounded-full text-white border border-white/30 shadow-2xl transition-all"
            style={{ zIndex: 100000, WebkitTapHighlightColor: 'transparent' }}
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <X size={20} strokeWidth={2.5} />
            <span className="text-xs font-bold uppercase tracking-wider">Close</span>
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-[500px] max-h-[80vh] bg-black shadow-[0_0_50px_rgba(61,122,74,0.2)] rounded-lg overflow-hidden mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={src}
              autoPlay
              loop
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div 
        onClick={openModal}
        className="relative aspect-[9/16] w-full bg-black rounded-sm overflow-hidden border border-zen shadow-lg group/video cursor-pointer"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover/video:scale-110"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-black/20">
          <div className="flex justify-between items-start">
            <div className="px-3 py-1 bg-emerald/80 backdrop-blur-md rounded-full">
              <span className="text-[10px] uppercase tracking-widest text-white font-bold">
                {t.girl.uneditedPreview}
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white/80 hover:text-emerald transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="p-4 bg-emerald rounded-full text-white shadow-md group-hover/video:scale-110 transition-transform duration-300">
              <Maximize2 size={24} />
            </div>
          </div>

          <div className="flex justify-center pb-2">
             <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-bold">Open Full Screen</span>
          </div>
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/video:bg-black/10 transition-colors">
            <div className="p-5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white animate-pulse">
              <Play size={28} fill="white" />
            </div>
          </div>
        )}
      </div>

      {/* Portal: render modal at document.body to escape all stacking contexts */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default TrustVideo;

