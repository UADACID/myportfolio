"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="rounded-md p-1.5 text-muted transition-colors hover:text-accent hover:bg-accent-muted"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="rounded-md p-1.5 text-muted transition-colors hover:text-accent hover:bg-accent-muted"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-accent-muted px-2.5 py-0.5 font-mono text-xs text-accent"
          >
            {tech}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
