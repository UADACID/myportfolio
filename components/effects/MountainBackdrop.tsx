"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Full-bleed blurred backdrop spanning Hero + About so the transparent
 * About section reveals it. The opaque Skills section (higher z-index, with
 * its own organic top edge) hides whatever backdrop extends below About, so
 * no straight image edge is ever visible.
 */
export function MountainBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Stay visible through Hero + About, then fade before Skills covers it
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    reduced ? [1, 1, 1, 1] : [1, 0.9, 0.4, 0]
  );

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full overflow-hidden"
      style={{ height: "min(190svh, 2400px)", opacity }}
      aria-hidden
    >
      <Image
        src="/hero/minecraft-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_25%] blur-[2px] sm:blur-[3px]"
      />

      <div className="absolute inset-0 bg-background/35 backdrop-blur-[5px] dark:bg-background/45 dark:backdrop-blur-[7px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-transparent" />
    </motion.div>
  );
}
