import React from "react";

/**
 * Decorative layer only — no data. Pure CSS animation for performance.
 */
export function PageBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#080C14]" />
      <div className="absolute inset-0 mesh-gradient opacity-90" />
      <div className="absolute inset-0 bg-grid-fade opacity-[0.4]" />

      {/* Cyber Glowing Orbs */}
      <div className="absolute -top-[15%] left-[10%] h-[min(65vw,550px)] w-[min(65vw,550px)] rounded-full bg-indigo-600/25 blur-[120px] motion-safe:animate-orb-1 hidden md:block" />
      <div className="absolute top-[30%] right-[-5%] h-[min(55vw,480px)] w-[min(55vw,480px)] rounded-full bg-cyan-500/20 blur-[110px] motion-safe:animate-orb-2 hidden lg:block" />
      <div className="absolute bottom-[-10%] left-[20%] h-[min(60vw,500px)] w-[min(60vw,500px)] rounded-full bg-pink-600/15 blur-[130px] motion-safe:animate-orb-3 hidden md:block" />
      <div className="absolute top-1/2 left-1/2 h-[45vh] w-[85vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />
    </div>
  );
}
