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
      <div className="absolute -top-[20%] left-[10%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-primary/30 blur-[100px] animate-orb-1" />
      <div className="absolute bottom-[-10%] right-[5%] h-[min(60vw,480px)] w-[min(60vw,480px)] rounded-full bg-secondary/10 blur-[110px] animate-orb-2" />
      <div className="absolute top-1/2 left-1/2 h-[40vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px] animate-orb-3" />
    </div>
  );
}
