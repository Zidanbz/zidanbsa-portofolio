"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useMascotGaze } from "@/components/portfolio/use-mascot-gaze";

export type MascotState = "idle" | "wave" | "blink" | "point" | "walk" | "sleep" | "celebrate";

type MascotCharacterProps = {
  imageSrc?: string;
  alt: string;
  state: MascotState;
  reduceMotion: boolean;
  decorative?: boolean;
  className?: string;
};

const mascotVariants: Variants = {
  idle: {
    y: [0, -5, 0],
    rotate: [-1, 1, -1],
    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
  },
  wave: {
    y: [0, -4, 0],
    rotate: [-1, 2, -1],
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  blink: { y: 0, rotate: 0, transition: { duration: 0.16 } },
  point: {
    x: [0, -5, 0],
    rotate: [0, -2, 0],
    transition: { duration: 1.2, repeat: 1, ease: "easeInOut" },
  },
  walk: {
    y: [0, -3, 0],
    rotate: [-1.5, 1.5, -1.5],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
  sleep: {
    y: 3,
    rotate: -4,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  celebrate: {
    y: [0, -14, 0, -8, 0],
    rotate: [0, -5, 5, -3, 0],
    scale: [1, 1.06, 1, 1.04, 1],
    transition: { duration: 0.9, ease: "easeInOut" },
  },
  reduced: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.2 },
  },
};

export function MascotCharacter({
  imageSrc,
  alt,
  state,
  reduceMotion,
  decorative = false,
  className,
}: MascotCharacterProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  const showImage = Boolean(imageSrc) && !imageFailed;

  return (
    <motion.div
      className={cn("relative h-full w-full", className)}
      variants={mascotVariants}
      animate={reduceMotion ? "reduced" : state}
      aria-hidden={decorative || undefined}
    >
      {showImage ? (
        <Image
          src={imageSrc!}
          alt={decorative ? "" : alt}
          fill
          sizes="160px"
          className="object-contain drop-shadow-[6px_7px_0_#000]"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <FallbackRobot state={state} reduceMotion={reduceMotion} alt={alt} decorative={decorative} />
      )}
    </motion.div>
  );
}

function FallbackRobot({
  state,
  reduceMotion,
  alt,
  decorative,
}: {
  state: MascotState;
  reduceMotion: boolean;
  alt: string;
  decorative: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isWaving = state === "wave" || state === "celebrate";
  const isPointing = state === "point";
  const isWalking = state === "walk";
  const isSleeping = state === "sleep";
  const isBlinking = state === "blink" || isSleeping;
  const gaze = useMascotGaze({
    target: svgRef,
    disabled: reduceMotion || isSleeping,
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 180 210"
      className="h-full w-full overflow-visible drop-shadow-[6px_7px_0_#000]"
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : alt}
    >
      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M90 28V12" stroke="#000" strokeWidth="6" strokeLinecap="round" />
        <motion.circle
          cx="90"
          cy="9"
          r="7"
          fill="#FF007A"
          stroke="#000"
          strokeWidth="4"
          animate={reduceMotion ? undefined : { fill: ["#FF007A", "#FFDE00", "#FF007A"] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.g>

      <rect x="15" y="43" width="19" height="42" rx="7" fill="#A3E635" stroke="#000" strokeWidth="5" />
      <rect x="146" y="43" width="19" height="42" rx="7" fill="#A3E635" stroke="#000" strokeWidth="5" />
      <rect x="28" y="27" width="124" height="78" rx="23" fill="#00F0FF" stroke="#000" strokeWidth="6" />
      <path d="M42 45C63 29 113 29 138 45" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.55" />

      <motion.g
        animate={{ scaleY: isBlinking ? 0.12 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.12 }}
        style={{ transformOrigin: "90px 63px" }}
      >
        <rect x="52" y="52" width="24" height="24" rx="8" fill="#080C14" stroke="#000" strokeWidth="4" />
        <rect x="104" y="52" width="24" height="24" rx="8" fill="#080C14" stroke="#000" strokeWidth="4" />
        <motion.g data-mascot-eyes style={{ x: gaze.x, y: gaze.y }}>
          <circle cx="64" cy="64" r="5" fill="#FFDE00" />
          <circle cx="116" cy="64" r="5" fill="#FFDE00" />
        </motion.g>
      </motion.g>
      {isSleeping ? (
        <path d="M76 89H104" stroke="#000" strokeWidth="5" strokeLinecap="round" />
      ) : (
        <path d="M69 87C82 96 99 96 112 87" stroke="#000" strokeWidth="5" strokeLinecap="round" />
      )}

      <rect x="42" y="108" width="96" height="70" rx="18" fill="#FFDE00" stroke="#000" strokeWidth="6" />
      <rect x="61" y="122" width="58" height="32" rx="9" fill="#080C14" stroke="#000" strokeWidth="4" />
      <text x="90" y="144" textAnchor="middle" fill="#00F0FF" fontSize="18" fontWeight="900" fontFamily="monospace">
        &lt;/&gt;
      </text>
      <circle cx="70" cy="166" r="5" fill="#FF007A" stroke="#000" strokeWidth="3" />
      <circle cx="90" cy="166" r="5" fill="#A3E635" stroke="#000" strokeWidth="3" />
      <circle cx="110" cy="166" r="5" fill="#00F0FF" stroke="#000" strokeWidth="3" />

      <motion.g
        animate={reduceMotion ? undefined : { rotate: isPointing ? -28 : state === "celebrate" ? 28 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ transformOrigin: "42px 122px" }}
      >
        <path d="M42 122L20 142L32 157L47 145" fill="#FF007A" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="24" cy="148" r="9" fill="#FF007A" stroke="#000" strokeWidth="5" />
      </motion.g>

      <motion.g
        animate={
          reduceMotion
            ? undefined
            : isWaving
              ? { rotate: [0, -25, 12, -22, 8, 0] }
              : { rotate: 0 }
        }
        transition={{ duration: state === "celebrate" ? 0.75 : 1.1, ease: "easeInOut" }}
        style={{ transformOrigin: "138px 122px" }}
      >
        <path d="M138 122L160 99L171 111L151 143" fill="#A3E635" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="166" cy="103" r="10" fill="#A3E635" stroke="#000" strokeWidth="5" />
      </motion.g>

      <motion.path
        d="M65 177V195H49"
        fill="none"
        stroke="#000"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduceMotion || !isWalking ? undefined : { rotate: [-7, 7, -7] }}
        transition={{ duration: 0.55, repeat: Infinity }}
        style={{ transformOrigin: "65px 177px" }}
      />
      <motion.path
        d="M115 177V195H131"
        fill="none"
        stroke="#000"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduceMotion || !isWalking ? undefined : { rotate: [7, -7, 7] }}
        transition={{ duration: 0.55, repeat: Infinity }}
        style={{ transformOrigin: "115px 177px" }}
      />
      <path d="M38 198H67" stroke="#FF007A" strokeWidth="12" strokeLinecap="round" />
      <path d="M113 198H142" stroke="#00F0FF" strokeWidth="12" strokeLinecap="round" />

      {isSleeping && (
        <motion.g
          animate={reduceMotion ? undefined : { y: [0, -8, -16], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <text x="143" y="40" fill="#FFDE00" fontSize="18" fontWeight="900">Z</text>
          <text x="157" y="25" fill="#00F0FF" fontSize="13" fontWeight="900">Z</text>
        </motion.g>
      )}
    </svg>
  );
}
