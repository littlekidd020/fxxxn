"use client";

import React from "react";
import Link from "next/link";
import { girls as defaultGirls } from "@/lib/data";
import GirlCard from "./GirlCard";
import { useLanguage } from "@/context/LanguageContext";

const GirlGrid = ({ limit, showCTA = false, girls = defaultGirls, showIntro = false }) => {
  const { t, lang } = useLanguage();

  const filteredGirls = girls.filter(model => model.status !== "hidden" && model.status !== "deleted");
  const displayedGirls = limit ? filteredGirls.slice(0, limit) : filteredGirls;

  return (
    <section className="px-8 pb-24 max-w-7xl mx-auto mt-4 md:mt-16">
      {/* Intro Text */}
      {showIntro && (
        <div className="mb-6 md:mb-16 text-center max-w-2xl mx-auto flex flex-col items-center">
          <p className="hidden md:block text-2xl font-serif italic text-[#2A2A2A]/80 leading-relaxed font-playfair transition-all duration-700">
            {lang === "cn" ? (
              "推门而入，喧嚣在外，这里是身份与品味的无声共鸣，不为喧宾夺主，只为让身处其中的每一个人，都能找到属于自己的——。"
            ) : (
              "A curated selection of the most sophisticated and refined talent, dedicated to the art of relaxation."
            )}
          </p>
          <div className="mt-0 md:mt-10 mb-2 w-full flex justify-center px-4">
            <Link 
              href="/collection" 
              className="inline-block text-center border border-emerald/80 text-emerald w-full max-w-[300px] md:max-w-[340px] py-3.5 md:py-4 text-base tracking-[0.4em] md:tracking-[0.5em] font-sans font-bold hover:bg-emerald/5 transition-colors duration-300"
            >
              {lang === "cn" ? "查看所有女生" : "VIEW COLLECTION"}
            </Link>
          </div>
          <h2 className="text-lg md:text-xl uppercase tracking-[0.3em] text-emerald mt-8 md:mt-16 font-sans font-bold">
            {t.grid.newCollection}
          </h2>
        </div>
      )}  {/* Masonry-Style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700">
        {displayedGirls.map((model, index) => (
          <div 
            key={model.id}
            className={`${
              index % 3 === 1 ? "md:translate-y-12" : ""
            } ${
              index % 3 === 2 ? "lg:translate-y-24" : ""
            }`}
          >
            <Link href={`/girl/${model.id}`}>
              <GirlCard model={model} />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {showCTA && (
        <div className="mt-32 flex justify-center">
          <Link 
            href="/collection"
            className="group relative px-12 py-4 bg-transparent border border-emerald/30 hover:border-emerald transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-xs uppercase tracking-[0.4em] text-emerald group-hover:text-white transition-colors duration-500 font-bold">
              {t.grid.viewAll}
            </span>
            <div className="absolute inset-0 bg-emerald translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default GirlGrid;
