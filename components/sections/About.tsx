"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function About() {
  const initials = site.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <AnimatedSection id="about">
      <SectionHeading label="// about" title="About Me" />

      <motion.div
        className="flex flex-col md:flex-row gap-10 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="shrink-0 flex h-32 w-32 items-center justify-center rounded-2xl border border-border bg-accent-muted font-mono text-3xl font-bold text-accent"
          aria-hidden
        >
          {initials}
        </motion.div>

        <div className="flex-1 space-y-4">
          {site.bio.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 30)}
              variants={fadeUp}
              className="text-muted leading-relaxed text-lg"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" />
              {site.location}
            </span>
            {site.available && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Available for work
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
