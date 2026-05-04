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
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 mesh-gradient opacity-90" />
      <div className="absolute inset-0 bg-grid-fade opacity-[0.2]" />
      <div className="absolute -top-[18%] left-[12%] h-[min(64vw,460px)] w-[min(64vw,460px)] rounded-full bg-primary/25 blur-[72px] motion-safe:animate-orb-1 hidden md:block" />
      <div className="absolute bottom-[-8%] right-[8%] h-[min(54vw,420px)] w-[min(54vw,420px)] rounded-full bg-secondary/10 blur-[80px] motion-safe:animate-orb-2 hidden lg:block" />
      <div className="absolute top-1/2 left-1/2 h-[34vh] w-[84vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[58px]" />
    </div>
  );
}
