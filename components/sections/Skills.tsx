"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/skills";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Skills() {
  return (
    <AnimatedSection id="skills">
      <SectionHeading
        label="// skills"
        title="Skills & Technologies"
        description="Technologies I work with to bring ideas to life."
      />

      <motion.div
        className="grid gap-6 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {skills.map((group) => (
          <motion.div
            key={group.category}
            variants={fadeUp}
            className="rounded-lg border border-border bg-surface-elevated p-6 shadow-sm"
          >
            <h3 className="mb-4 font-mono text-xs text-accent">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill}>
                  <span className="inline-block rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
