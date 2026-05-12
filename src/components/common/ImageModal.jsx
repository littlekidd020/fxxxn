"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageModal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all border border-white/10"
        >
          <X size={24} />
        </button>

        {/* Main Content Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Navigation - Left */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-0 z-[110] p-4 bg-white/5 hover:bg-emerald rounded-full text-white transition-all border border-white/10 hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Navigation - Right */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-0 z-[110] p-4 bg-white/5 hover:bg-emerald rounded-full text-white transition-all border border-white/10 hidden md:block"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Image Wrapper */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-full max-h-full flex items-center justify-center pointer-events-none"
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
            />
            
            {/* Index Overlay */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/40 font-sans text-xs uppercase tracking-[0.3em]">
              {currentIndex + 1} <span className="mx-2">/</span> {images.length}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ImageModal;
