"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type AnimatedSectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function AnimatedSection({ id, children, className = "" }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`py-24 scroll-mt-20 ${className}`}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewportOnce}
      variants={shouldReduceMotion ? undefined : fadeUp}
    >
      <div className="mx-auto max-w-5xl px-6">{children}</div>
    </motion.section>
  );
}
