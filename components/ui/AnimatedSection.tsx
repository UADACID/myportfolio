"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { PuzzleEdge } from "@/components/ui/PuzzleEdge";

const toneConfig = {
  about: {
    // Semi-transparent so the blurred backdrop shows through
    fill: "color-mix(in srgb, var(--section-about) 40%, transparent)",
    variant: 0,
    z: "z-[11]",
  },
  skills: {
    fill: "var(--section-skills)",
    variant: 1,
    z: "z-[12]",
  },
  projects: {
    fill: "var(--section-projects)",
    variant: 2,
    z: "z-[13]",
  },
  experience: {
    fill: "var(--section-experience)",
    variant: 3,
    z: "z-[14]",
  },
  contact: {
    fill: "var(--section-contact)",
    variant: 4,
    z: "z-[15]",
  },
} as const;

export type SectionTone = keyof typeof toneConfig;

type AnimatedSectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
};

export function AnimatedSection({
  id,
  children,
  className = "",
  tone,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const config = tone ? toneConfig[tone] : null;

  return (
    <section
      id={id}
      className={`relative scroll-mt-28 overflow-visible py-24 ${config?.z ?? "z-10"} ${className}`}
    >
      {config && (
        <PuzzleEdge fill={config.fill} variant={config.variant} />
      )}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={viewportOnce}
        variants={shouldReduceMotion ? undefined : fadeUp}
      >
        {children}
      </motion.div>
    </section>
  );
}
