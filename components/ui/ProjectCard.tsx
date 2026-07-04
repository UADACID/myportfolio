"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ZoomIn } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ProjectImageModal } from "@/components/ui/ProjectImageModal";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <>
      <motion.article
        className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/40"
        variants={fadeUp}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        {project.image && (
          <button
            type="button"
            onClick={() => setImageOpen(true)}
            aria-label={`View ${project.title} screenshot`}
            className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted/10 cursor-zoom-in"
          >
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/20">
              <span className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-95">
                <ZoomIn className="h-3.5 w-3.5" />
                View image
              </span>
            </span>
          </button>
        )}

        <div className="flex flex-1 flex-col p-6">
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
        </div>
      </motion.article>

      {project.image && (
        <ProjectImageModal
          open={imageOpen}
          onClose={() => setImageOpen(false)}
          src={project.image}
          title={project.title}
        />
      )}
    </>
  );
}
