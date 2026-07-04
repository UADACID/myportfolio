"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { ProjectImageModal } from "@/components/ui/ProjectImageModal";
import { TextLink } from "@/components/ui/TextLink";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageOpen, setImageOpen] = useState(false);
  const techLine = project.tech.slice(0, 5).join(" · ");

  return (
    <>
      <article className="border-b border-border/50 py-12 first:pt-0 last:border-b-0">
        {project.image && (
          <button
            type="button"
            onClick={() => setImageOpen(true)}
            aria-label={`View ${project.title} screenshot`}
            className="group relative mb-8 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border/80 bg-surface"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          </button>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-medium tracking-tight text-foreground">
              {project.title}
            </h3>
            {techLine && (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {techLine}
              </p>
            )}
          </div>

          <div className="flex shrink-0 gap-4">
            {project.live && (
              <TextLink href={project.live} external className="text-sm">
                Live
              </TextLink>
            )}
            {project.github && (
              <TextLink href={project.github} external className="text-sm">
                GitHub
              </TextLink>
            )}
            {project.image && (
              <button
                type="button"
                onClick={() => setImageOpen(true)}
                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
              >
                Screenshot
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
          {project.description}
        </p>
      </article>

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
