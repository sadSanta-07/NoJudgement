"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  scale?: number;
  viewportAmount?: number | "some" | "all";
}

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function AnimateIn({
  children,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 28,
  scale = 1,
  className = "",
  viewportAmount = 0.15,
}: AnimateInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 1 };

    const initial: { opacity: number; x?: number; y?: number; scale?: number } = {
      opacity: 0,
    };

    if (scale !== 1) initial.scale = scale;

    switch (direction) {
      case "up":
        initial.y = distance;
        break;
      case "down":
        initial.y = -distance;
        break;
      case "left":
        initial.x = distance;
        break;
      case "right":
        initial.x = -distance;
        break;
      case "none":
      default:
        break;
    }

    return initial;
  };

  const getAnimate = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
