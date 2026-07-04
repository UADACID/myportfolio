"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const spring = { damping: 35, stiffness: 80, mass: 0.9 };

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

function subscribeMounted() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getMountedServerSnapshot() {
  return false;
}

const glowLayers = [
  { size: "h-[400px] w-[400px]", background: "var(--glow-outer)" },
  { size: "h-20 w-20", background: "var(--glow-core)" },
] as const;

export function MouseGlow() {
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot
  );
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

  if (
    !mounted ||
    shouldReduceMotion ||
    !hasFinePointer ||
    resolvedTheme === "light"
  ) {
    return null;
  }

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
          animate={{ opacity: isActive ? 0.7 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
