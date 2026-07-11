"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ActionButton } from "@/components/ui/ActionButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Projects() {
  const featured = projects.filter((p) => p.featured ?? true);

  return (
    <AnimatedSection id="projects" tone="projects">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
        <motion.div
          className="lg:sticky lg:top-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs text-accent"
          >
            // projects
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            A closer look at the products I build and ship
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-[15px] leading-7 text-foreground/70"
          >
            A selection of cross-platform apps I&apos;m proud of — from real-time
            live venues to management tools and e-commerce.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <ActionButton
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition-shadow hover:shadow-md"
            >
              Get in touch
            </ActionButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:auto-rows-fr sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {featured.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              highlight={index === 0}
            />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
