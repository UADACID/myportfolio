"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { ProjectImageModal } from "@/components/ui/ProjectImageModal";
import { ActionButton } from "@/components/ui/ActionButton";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <>
      <motion.article className="group" variants={fadeUp}>
        {project.image && (
          <ActionButton
            instant
            onClick={() => setImageOpen(true)}
            aria-label={`View ${project.title} screenshot`}
            className="relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-surface shadow-sm transition-shadow duration-300 group-hover:shadow-md"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
              />
            </div>
          </ActionButton>
        )}

        <div className="mt-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>

            {(project.github || project.live) && (
              <div className="flex shrink-0 items-center gap-1 text-muted-foreground opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                {project.github && (
                  <ActionButton
                    href={project.github}
                    external
                    aria-label={`${project.title} on GitHub`}
                    className="rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </ActionButton>
                )}
                {project.live && (
                  <ActionButton
                    href={project.live}
                    external
                    aria-label={`${project.title} live demo`}
                    className="rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </ActionButton>
                )}
              </div>
            )}
          </div>

          <p className="mt-2 text-[15px] leading-7 text-muted">
            {project.description}
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            {project.tech.join(" · ")}
          </p>
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
