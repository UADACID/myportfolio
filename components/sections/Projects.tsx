"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { staggerContainer } from "@/lib/motion";

export function Projects() {
  const featured = projects.filter((p) => p.featured ?? true);

  return (
    <AnimatedSection id="projects">
      <SectionHeading
        label="// projects"
        title="Featured Projects"
        description="A selection of work I'm proud of."
      />

      <motion.div
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
