"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const spring = { damping: 32, stiffness: 90, mass: 0.8 };

function subscribePointer(onStoreChange: () => void) {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerPointerSnapshot() {
  return false;
}

const glowLayers = [
  {
    size: "h-[640px] w-[640px]",
    background: "var(--glow-outer)",
    opacity: { active: 1, idle: 0 },
    duration: 0.5,
  },
  {
    size: "h-[320px] w-[320px]",
    background: "var(--glow-mid)",
    opacity: { active: 1, idle: 0 },
    duration: 0.4,
  },
  {
    size: "h-36 w-36",
    background: "var(--glow-core)",
    opacity: { active: 1, idle: 0 },
    duration: 0.35,
  },
] as const;

export function MouseGlow() {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  useEffect(() => {
    if (shouldReduceMotion || !hasFinePointer) return;

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsActive(true);
    };

    const onLeave = () => setIsActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [shouldReduceMotion, hasFinePointer, mouseX, mouseY]);

  if (shouldReduceMotion || !hasFinePointer) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {glowLayers.map((layer) => (
        <motion.div
          key={layer.size}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${layer.size}`}
          style={{ x, y, background: layer.background }}
          animate={{ opacity: isActive ? layer.opacity.active : layer.opacity.idle }}
          transition={{ duration: layer.duration, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
