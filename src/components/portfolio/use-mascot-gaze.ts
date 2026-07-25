"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

type UseMascotGazeOptions = {
  target: React.RefObject<SVGSVGElement | null>;
  disabled?: boolean;
};

type MascotGaze = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

const springConfig = {
  stiffness: 220,
  damping: 22,
  mass: 0.4,
};

export function useMascotGaze({ target, disabled = false }: UseMascotGazeOptions): MascotGaze {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  useEffect(() => {
    targetX.set(0);
    targetY.set(0);

    if (disabled) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) {
      return;
    }

    let animationFrame: number | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const updateGaze = () => {
      animationFrame = null;
      const element = target.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const isVisible =
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom >= 0 &&
        rect.top <= window.innerHeight &&
        rect.right >= 0 &&
        rect.left <= window.innerWidth;

      if (!isVisible) {
        targetX.set(0);
        targetY.set(0);
        return;
      }

      const deltaX = pointerX - (rect.left + rect.width / 2);
      const deltaY = pointerY - (rect.top + rect.height * 0.31);
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const strength = Math.min(distance / Math.max(rect.width * 1.4, 1), 1);

      targetX.set((deltaX / distance) * 4 * strength);
      targetY.set((deltaY / distance) * 3 * strength);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateGaze);
      }
    };

    const resetGaze = () => {
      targetX.set(0);
      targetY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetGaze);
    document.documentElement.addEventListener("pointerleave", resetGaze);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetGaze);
      document.documentElement.removeEventListener("pointerleave", resetGaze);
      targetX.set(0);
      targetY.set(0);
    };
  }, [disabled, target, targetX, targetY]);

  return { x, y };
}
