import React, { type CSSProperties } from "react";

type FloatingAsset = {
  content: string;
  left: string;
  top: string;
  color: string;
  size: "sm" | "md" | "lg";
  delay: string;
  duration: string;
  driftX: string;
  driftY: string;
  rotation: string;
  visibility?: string;
};

type Particle = {
  left: string;
  top: string;
  color: string;
  size: string;
  delay: string;
  duration: string;
  driftX: string;
  driftY: string;
  visibility?: string;
};

type BackdropStyle = CSSProperties & {
  "--asset-left": string;
  "--asset-top": string;
  "--asset-delay": string;
  "--asset-duration": string;
  "--asset-drift-x": string;
  "--asset-drift-y": string;
  "--asset-rotation"?: string;
  "--asset-size"?: string;
};

const floatingAssets: FloatingAsset[] = [
  { content: "</>", left: "4%", top: "10%", color: "bg-[#00F0FF]", size: "lg", delay: "-2s", duration: "17s", driftX: "28px", driftY: "-34px", rotation: "12deg" },
  { content: "{ }", left: "86%", top: "8%", color: "bg-[#FFDE00]", size: "md", delay: "-8s", duration: "19s", driftX: "-34px", driftY: "28px", rotation: "-10deg" },
  { content: "API", left: "92%", top: "22%", color: "bg-[#A3E635]", size: "sm", delay: "-4s", duration: "15s", driftX: "-26px", driftY: "-32px", rotation: "8deg", visibility: "hidden sm:flex" },
  { content: "01", left: "7%", top: "28%", color: "bg-[#FF007A] text-white", size: "sm", delay: "-11s", duration: "18s", driftX: "24px", driftY: "30px", rotation: "-14deg", visibility: "hidden sm:flex" },
  { content: "UI", left: "2%", top: "48%", color: "bg-[#FFDE00]", size: "md", delay: "-6s", duration: "21s", driftX: "38px", driftY: "-24px", rotation: "9deg" },
  { content: "UX", left: "89%", top: "43%", color: "bg-[#00F0FF]", size: "md", delay: "-1s", duration: "16s", driftX: "-30px", driftY: "36px", rotation: "-8deg", visibility: "hidden md:flex" },
  { content: "//", left: "10%", top: "66%", color: "bg-[#A3E635]", size: "sm", delay: "-12s", duration: "20s", driftX: "32px", driftY: "22px", rotation: "16deg", visibility: "hidden md:flex" },
  { content: "DEV", left: "93%", top: "62%", color: "bg-[#FF007A] text-white", size: "lg", delay: "-9s", duration: "23s", driftX: "-42px", driftY: "-27px", rotation: "-12deg", visibility: "hidden sm:flex" },
  { content: "[ ]", left: "3%", top: "83%", color: "bg-[#00F0FF]", size: "md", delay: "-15s", duration: "22s", driftX: "26px", driftY: "-38px", rotation: "10deg" },
  { content: "JS", left: "83%", top: "81%", color: "bg-[#FFDE00]", size: "sm", delay: "-5s", duration: "18s", driftX: "-22px", driftY: "34px", rotation: "-16deg", visibility: "hidden md:flex" },
  { content: "#", left: "19%", top: "16%", color: "bg-[#FF007A] text-white", size: "sm", delay: "-7s", duration: "14s", driftX: "18px", driftY: "26px", rotation: "18deg", visibility: "hidden lg:flex" },
  { content: "⚡", left: "74%", top: "15%", color: "bg-[#A3E635]", size: "md", delay: "-3s", duration: "17s", driftX: "-25px", driftY: "-24px", rotation: "12deg", visibility: "hidden lg:flex" },
  { content: "=>", left: "16%", top: "41%", color: "bg-[#FFDE00]", size: "sm", delay: "-13s", duration: "19s", driftX: "24px", driftY: "-30px", rotation: "-9deg", visibility: "hidden lg:flex" },
  { content: "APP", left: "77%", top: "36%", color: "bg-[#00F0FF]", size: "sm", delay: "-10s", duration: "21s", driftX: "-28px", driftY: "25px", rotation: "11deg", visibility: "hidden lg:flex" },
  { content: "::", left: "20%", top: "77%", color: "bg-[#A3E635]", size: "sm", delay: "-16s", duration: "16s", driftX: "22px", driftY: "-26px", rotation: "-12deg", visibility: "hidden lg:flex" },
  { content: "GIT", left: "70%", top: "72%", color: "bg-[#FF007A] text-white", size: "sm", delay: "-4s", duration: "20s", driftX: "-34px", driftY: "28px", rotation: "13deg", visibility: "hidden lg:flex" },
  { content: "_", left: "28%", top: "91%", color: "bg-[#FFDE00]", size: "sm", delay: "-9s", duration: "15s", driftX: "20px", driftY: "-32px", rotation: "8deg", visibility: "hidden md:flex" },
  { content: "✦", left: "91%", top: "92%", color: "bg-[#00F0FF]", size: "md", delay: "-14s", duration: "18s", driftX: "-30px", driftY: "-22px", rotation: "22deg" },
];

const particles: Particle[] = [
  { left: "12%", top: "6%", color: "bg-[#FFDE00]", size: "7px", delay: "-1s", duration: "12s", driftX: "18px", driftY: "30px" },
  { left: "31%", top: "11%", color: "bg-[#00F0FF]", size: "5px", delay: "-7s", duration: "14s", driftX: "-14px", driftY: "24px", visibility: "hidden sm:block" },
  { left: "61%", top: "7%", color: "bg-[#FF007A]", size: "8px", delay: "-4s", duration: "16s", driftX: "20px", driftY: "-18px" },
  { left: "81%", top: "27%", color: "bg-[#A3E635]", size: "6px", delay: "-9s", duration: "13s", driftX: "-22px", driftY: "28px" },
  { left: "24%", top: "31%", color: "bg-[#00F0FF]", size: "6px", delay: "-5s", duration: "17s", driftX: "16px", driftY: "-26px", visibility: "hidden md:block" },
  { left: "54%", top: "24%", color: "bg-[#FFDE00]", size: "5px", delay: "-12s", duration: "15s", driftX: "-18px", driftY: "20px", visibility: "hidden lg:block" },
  { left: "95%", top: "34%", color: "bg-[#FF007A]", size: "8px", delay: "-6s", duration: "18s", driftX: "-24px", driftY: "-22px" },
  { left: "6%", top: "39%", color: "bg-[#A3E635]", size: "5px", delay: "-2s", duration: "14s", driftX: "28px", driftY: "18px" },
  { left: "35%", top: "49%", color: "bg-[#FF007A]", size: "7px", delay: "-10s", duration: "16s", driftX: "-20px", driftY: "-24px", visibility: "hidden lg:block" },
  { left: "67%", top: "46%", color: "bg-[#00F0FF]", size: "6px", delay: "-3s", duration: "12s", driftX: "22px", driftY: "26px", visibility: "hidden md:block" },
  { left: "84%", top: "54%", color: "bg-[#FFDE00]", size: "5px", delay: "-11s", duration: "19s", driftX: "-16px", driftY: "24px" },
  { left: "18%", top: "59%", color: "bg-[#A3E635]", size: "8px", delay: "-8s", duration: "17s", driftX: "24px", driftY: "-20px" },
  { left: "46%", top: "64%", color: "bg-[#FFDE00]", size: "6px", delay: "-14s", duration: "14s", driftX: "-18px", driftY: "-28px", visibility: "hidden lg:block" },
  { left: "74%", top: "68%", color: "bg-[#FF007A]", size: "7px", delay: "-6s", duration: "18s", driftX: "16px", driftY: "22px", visibility: "hidden sm:block" },
  { left: "96%", top: "75%", color: "bg-[#00F0FF]", size: "5px", delay: "-12s", duration: "15s", driftX: "-26px", driftY: "-18px" },
  { left: "8%", top: "73%", color: "bg-[#FFDE00]", size: "6px", delay: "-4s", duration: "13s", driftX: "24px", driftY: "26px" },
  { left: "38%", top: "84%", color: "bg-[#A3E635]", size: "5px", delay: "-9s", duration: "17s", driftX: "-14px", driftY: "-24px", visibility: "hidden md:block" },
  { left: "62%", top: "88%", color: "bg-[#00F0FF]", size: "8px", delay: "-13s", duration: "16s", driftX: "20px", driftY: "-20px" },
  { left: "78%", top: "96%", color: "bg-[#FF007A]", size: "6px", delay: "-5s", duration: "14s", driftX: "-22px", driftY: "-26px", visibility: "hidden sm:block" },
  { left: "15%", top: "94%", color: "bg-[#A3E635]", size: "7px", delay: "-10s", duration: "18s", driftX: "26px", driftY: "-22px" },
];

const sizeClasses: Record<FloatingAsset["size"], string> = {
  sm: "min-h-7 min-w-7 px-2 text-[10px]",
  md: "min-h-9 min-w-9 px-2.5 text-xs",
  lg: "min-h-11 min-w-11 px-3 text-sm",
};

function getAssetStyle(asset: FloatingAsset | Particle): BackdropStyle {
  return {
    "--asset-left": asset.left,
    "--asset-top": asset.top,
    "--asset-delay": asset.delay,
    "--asset-duration": asset.duration,
    "--asset-drift-x": asset.driftX,
    "--asset-drift-y": asset.driftY,
    ...("rotation" in asset ? { "--asset-rotation": asset.rotation } : {}),
    ...("size" in asset && !["sm", "md", "lg"].includes(asset.size)
      ? { "--asset-size": asset.size }
      : {}),
  };
}

/** Decorative global layer. Motion is isolated from content and remains non-interactive. */
export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#080C14]" />
      <div className="absolute inset-0 mesh-gradient opacity-90" />
      <div className="absolute inset-0 bg-grid-fade opacity-40" />
      <div className="backdrop-scanline absolute inset-0 opacity-20" />

      <div className="absolute -top-[15%] left-[10%] hidden h-[min(65vw,550px)] w-[min(65vw,550px)] rounded-full bg-indigo-600/25 blur-[120px] motion-safe:animate-orb-1 md:block" />
      <div className="absolute right-[-5%] top-[30%] hidden h-[min(55vw,480px)] w-[min(55vw,480px)] rounded-full bg-cyan-500/20 blur-[110px] motion-safe:animate-orb-2 lg:block" />
      <div className="absolute bottom-[-10%] left-[20%] hidden h-[min(60vw,500px)] w-[min(60vw,500px)] rounded-full bg-pink-600/15 blur-[130px] motion-safe:animate-orb-3 md:block" />
      <div className="absolute left-1/2 top-1/2 h-[45vh] w-[85vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />

      <div className="backdrop-orbit left-[-12rem] top-[15%] h-80 w-80 border-[#00F0FF]/20" />
      <div className="backdrop-orbit -right-40 top-[52%] h-72 w-72 border-[#FFDE00]/20 [animation-direction:reverse]" />
      <div className="backdrop-orbit bottom-[-10rem] left-[38%] hidden h-96 w-96 border-[#FF007A]/15 md:block [animation-duration:32s]" />

      {particles.map((particle, index) => (
        <span
          key={`particle-${index}`}
          className={`backdrop-particle ${particle.color} ${particle.visibility ?? ""}`}
          style={getAssetStyle(particle)}
        />
      ))}

      {floatingAssets.map((asset, index) => (
        <span
          key={`${asset.content}-${index}`}
          className={`backdrop-floater ${sizeClasses[asset.size]} ${asset.color} ${asset.visibility ?? "flex"}`}
          style={getAssetStyle(asset)}
        >
          {asset.content}
        </span>
      ))}
    </div>
  );
}
