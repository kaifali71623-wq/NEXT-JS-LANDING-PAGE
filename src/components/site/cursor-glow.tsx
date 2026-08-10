"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Custom magnetic cursor follower.
 * Renders a soft glow that trails the mouse on desktop only.
 */
export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 });
  const opacity = useTransform(sx, [-200, 0, 1000], [0, 0.5, 0.5]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[100] hidden h-[400px] w-[400px] rounded-full blur-3xl md:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
        background:
          "radial-gradient(circle, rgba(44,100,161,0.18) 0%, rgba(169,210,255,0.08) 40%, transparent 70%)",
      }}
    />
  );
}
