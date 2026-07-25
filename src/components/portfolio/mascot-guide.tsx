"use client";

import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { MascotCharacter, type MascotState } from "@/components/portfolio/mascot-character";
import {
  MascotSpeechBubble,
  type SpeechBubblePosition,
} from "@/components/portfolio/mascot-speech-bubble";
import {
  useMascotAnimation,
  type MascotSection,
} from "@/components/portfolio/use-mascot-animation";
import { cn } from "@/lib/utils";

type MascotPosition = "left" | "center" | "right";

type PortfolioMascotProps = {
  imageSrc?: string;
  alt?: string;
  size?: number;
  mobileSize?: number;
  position?: MascotPosition;
  section: MascotSection;
  state?: MascotState;
  className?: string;
  speech?: string;
  speechPosition?: SpeechBubblePosition;
  interactionSignal?: number;
  scrollTargetRef?: RefObject<HTMLElement | null>;
  decorative?: boolean;
  disableMotion?: boolean;
};

type MascotStyle = CSSProperties & {
  "--mascot-size": string;
  "--mascot-mobile-size": string;
};

const positionClasses: Record<MascotPosition, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export function PortfolioMascot({
  imageSrc,
  alt = "Robot mascot guiding visitors through the portfolio",
  size = 120,
  mobileSize = 72,
  position = "center",
  section,
  state: stateOverride,
  className,
  speech = "Explore some of my featured work.",
  speechPosition = "left",
  interactionSignal = 0,
  scrollTargetRef,
  decorative = true,
  disableMotion = false,
}: PortfolioMascotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = disableMotion || Boolean(useReducedMotion());
  const isInView = useInView(rootRef, {
    once: section !== "milestones",
    margin: "-8% 0px -8% 0px",
  });
  const [scrollTravel, setScrollTravel] = useState(0);
  const [milestoneSignal, setMilestoneSignal] = useState(0);
  const celebrated = useRef(false);
  const targetRef = scrollTargetRef ?? (rootRef as RefObject<HTMLElement | null>);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const trackedY = useTransform(scrollYProgress, [0, 1], [0, scrollTravel]);
  const { state, showSpeech } = useMascotAnimation({
    section,
    isInView,
    reduceMotion,
    stateOverride,
    interactionSignal: interactionSignal + milestoneSignal,
  });

  useEffect(() => {
    if (section !== "milestones" || !scrollTargetRef?.current) {
      return;
    }

    const target = scrollTargetRef.current;
    const updateTravel = () => {
      setScrollTravel(Math.max(target.offsetHeight - window.innerHeight, 0));
    };

    updateTravel();
    const observer = new ResizeObserver(updateTravel);
    observer.observe(target);
    window.addEventListener("resize", updateTravel);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTravel);
    };
  }, [scrollTargetRef, section, size]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (section !== "milestones" || reduceMotion || celebrated.current || latest < 0.94) {
      return;
    }

    celebrated.current = true;
    setMilestoneSignal((value) => value + 1);
  });

  const mascotStyle: MascotStyle = {
    "--mascot-size": `${size}px`,
    "--mascot-mobile-size": `${mobileSize}px`,
  };

  return (
    <motion.div
      ref={rootRef}
      className={cn(
        "portfolio-mascot pointer-events-none relative z-20 flex shrink-0",
        positionClasses[position],
        className
      )}
      style={{
        ...mascotStyle,
        y: section === "milestones" && !reduceMotion ? trackedY : 0,
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : reduceMotion ? 0 : 20 }}
        transition={{ duration: reduceMotion ? 0.18 : 0.45, ease: "easeOut" }}
      >
        <MascotCharacter
          imageSrc={imageSrc}
          alt={alt}
          state={state}
          reduceMotion={reduceMotion}
          decorative={decorative}
        />
      </motion.div>

      <MascotSpeechBubble
        message={speech}
        visible={section === "projects" && showSpeech}
        position={speechPosition}
        reduceMotion={reduceMotion}
        className="hidden sm:block"
      />
    </motion.div>
  );
}
