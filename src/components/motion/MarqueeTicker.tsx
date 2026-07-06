"use client";

import React from "react";
import { motion } from "framer-motion";

const TECH_ITEMS = [
  "FLUTTER ⚡",
  "NEXT.JS 15 🚀",
  "TYPESCRIPT 💙",
  "NODE.JS 🟢",
  "TAILWIND CSS 🎨",
  "THREE.JS 🌐",
  "FIREBASE 🔥",
  "REACT 19 ⚛️",
  "REST & GRAPHQL ⚡",
  "CLEAN ARCHITECTURE 🏛️",
  "MOBILE ECOSYSTEM 📱",
  "NEOBRUTALISM UI ⚡",
];

export function MarqueeTicker() {
  // Multiply items to create smooth infinite loop
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-[#FFDE00] border-y-4 border-black py-3.5 my-8 shadow-brutal z-10 select-none">
      <div className="flex w-max">
        <motion.div
          className="flex whitespace-nowrap gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-3 font-luckiest font-black text-lg md:text-xl text-black uppercase tracking-wider"
            >
              <span>{item}</span>
              <span className="text-black/30 font-headline font-black text-sm">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
