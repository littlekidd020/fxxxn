"use client";

import React from "react";
import { motion } from "framer-motion";

const BrandLogo = ({ className = "w-12 h-12" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.5, ease: "circOut" }}
      className={`relative ${className} flex items-center justify-center`}
    >
      <img 
        src="/images/logo.svg" 
        alt="Fxxxn Logo" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default BrandLogo;
