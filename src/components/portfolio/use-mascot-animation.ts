"use client";

import { useEffect, useRef, useState } from "react";
import type { MascotState } from "@/components/portfolio/mascot-character";

export type MascotSection = "hero" | "projects" | "milestones" | "contact" | "custom";

type UseMascotAnimationOptions = {
  section: MascotSection;
  isInView: boolean;
  reduceMotion: boolean;
  stateOverride?: MascotState;
  interactionSignal?: number;
};

const PROJECT_BUBBLE_SESSION_KEY = "portfolio-mascot-project-bubble-seen";

export function useMascotAnimation({
  section,
  isInView,
  reduceMotion,
  stateOverride,
  interactionSignal = 0,
}: UseMascotAnimationOptions) {
  const [state, setState] = useState<MascotState>(stateOverride ?? "idle");
  const [showSpeech, setShowSpeech] = useState(false);
  const sequenceStarted = useRef(false);

  useEffect(() => {
    if (stateOverride) {
      setState(stateOverride);
    }
  }, [stateOverride]);

  useEffect(() => {
    if (!isInView || stateOverride || sequenceStarted.current) {
      return;
    }

    sequenceStarted.current = true;
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    if (reduceMotion) {
      setState("idle");
      return;
    }

    if (section === "hero") {
      setState("wave");
      timers.push(setTimeout(() => setState("idle"), 1500));
    } else if (section === "projects") {
      setState("point");

      try {
        const alreadySeen = window.sessionStorage.getItem(PROJECT_BUBBLE_SESSION_KEY) === "true";
        if (!alreadySeen) {
          setShowSpeech(true);
          window.sessionStorage.setItem(PROJECT_BUBBLE_SESSION_KEY, "true");
          timers.push(setTimeout(() => setShowSpeech(false), 2700));
        }
      } catch {
        setShowSpeech(true);
        timers.push(setTimeout(() => setShowSpeech(false), 2700));
      }

      timers.push(setTimeout(() => setState("idle"), 2400));
    } else if (section === "milestones") {
      setState("walk");
    } else if (section === "contact") {
      setState("wave");
      timers.push(setTimeout(() => setState("idle"), 1500));
    }

    return () => timers.forEach(clearTimeout);
  }, [isInView, reduceMotion, section, stateOverride]);

  useEffect(() => {
    if (!interactionSignal || reduceMotion || stateOverride) {
      return;
    }

    setState("celebrate");
    const timer = setTimeout(
      () => setState(section === "milestones" ? "walk" : "idle"),
      950
    );

    return () => clearTimeout(timer);
  }, [interactionSignal, reduceMotion, section, stateOverride]);

  useEffect(() => {
    if (!isInView || reduceMotion || stateOverride || state !== "idle") {
      return;
    }

    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const blinkTimer = setTimeout(
      () => {
        setState("blink");
        resetTimer = setTimeout(() => setState("idle"), 170);
      },
      2800 + Math.random() * 2600
    );

    return () => {
      clearTimeout(blinkTimer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [isInView, reduceMotion, state, stateOverride]);

  return { state, showSpeech };
}
