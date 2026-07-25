"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

function useShouldReduceEffects() {
  const reduceMotion = useReducedMotion();
  // Only respect user's explicit OS reduced-motion preference
  return Boolean(reduceMotion);
}

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduce = useShouldReduceEffects();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px -10% 0px" }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  index: number;
  stagger?: number;
};

export function StaggerItem({
  children,
  className,
  index,
  stagger = 0.07,
}: StaggerItemProps) {
  const reduce = useShouldReduceEffects();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px 0px -8% 0px" }}
      transition={{ duration: 0.45, delay: index * stagger, ease }}
    >
      {children}
    </motion.div>
  );
}

type LiftProps = {
  children: ReactNode;
  className?: string;
};

/** Dynamic spring lift & subtle tilt on hover */
export function LiftOnHover({ children, className }: LiftProps) {
  const reduce = useShouldReduceEffects();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, scale: 1.02, rotate: -0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

type FloatAnimationProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
};

/** Continuous bobbing / floating animation for stickers & badges */
export function FloatAnimation({
  children,
  className,
  duration = 3.5,
  distance = 8,
}: FloatAnimationProps) {
  const reduce = useShouldReduceEffects();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [-distance, distance, -distance] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

type PopInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Pop in animation with elastic overshoot */
export function PopIn({ children, className, delay = 0 }: PopInProps) {
  const reduce = useShouldReduceEffects();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
