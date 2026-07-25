"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SpeechBubblePosition = "left" | "right" | "top";

type MascotSpeechBubbleProps = {
  message: string;
  visible: boolean;
  position?: SpeechBubblePosition;
  reduceMotion?: boolean;
  className?: string;
};

const positionClasses: Record<SpeechBubblePosition, string> = {
  left: "right-[calc(100%+0.75rem)] top-3 after:-right-2 after:top-5 after:border-b-2 after:border-r-2",
  right: "left-[calc(100%+0.75rem)] top-3 after:-left-2 after:top-5 after:border-l-2 after:border-t-2",
  top: "bottom-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-b-2 after:border-r-2",
};

export function MascotSpeechBubble({
  message,
  visible,
  position = "left",
  reduceMotion = false,
  className,
}: MascotSpeechBubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          role="status"
          aria-live="polite"
          className={cn(
            "absolute z-20 w-56 rounded-2xl border-3 border-black bg-white px-4 py-3 text-left font-headline text-xs font-black leading-snug text-black shadow-brutal after:absolute after:h-4 after:w-4 after:rotate-45 after:border-black after:bg-white after:content-['']",
            positionClasses[position],
            className
          )}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.88, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.94, y: reduceMotion ? 0 : -4 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.28, ease: "easeOut" }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
