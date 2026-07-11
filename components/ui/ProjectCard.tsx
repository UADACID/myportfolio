"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectImageModal } from "@/components/ui/ProjectImageModal";
import { fadeUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  /** Render as the large, inverse, attention-grabbing bento tile. */
  highlight?: boolean;
};

export function ProjectCard({ project, highlight = false }: ProjectCardProps) {
  const [imageOpen, setImageOpen] = useState(false);
  const Arrow = highlight ? ArrowUpRight : ArrowRight;

  return (
    <>
      <motion.article
        variants={fadeUp}
        className={highlight ? "sm:row-span-2" : ""}
      >
        <button
          type="button"
          onClick={() => project.image && setImageOpen(true)}
          aria-label={`View ${project.title}`}
          className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
            highlight
              ? "border-transparent bg-foreground text-background shadow-lg hover:shadow-xl"
              : "border-border bg-surface/70 text-foreground hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
          } ${project.image ? "cursor-pointer" : "cursor-default"}`}
        >
          {project.image && (
            <div
              className={`relative w-full shrink-0 overflow-hidden ${
                highlight ? "h-1/2 min-h-[220px]" : "aspect-[16/10]"
              }`}
            >
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className={`absolute inset-0 ${
                  highlight
                    ? "bg-gradient-to-t from-foreground via-foreground/20 to-transparent"
                    : "bg-gradient-to-t from-surface/70 to-transparent"
                }`}
              />
            </div>
          )}

          <div className="relative flex flex-1 flex-col p-6 sm:p-7">
            <span
              aria-hidden
              className={`h-0.5 w-8 rounded-full ${
                highlight ? "bg-background/60" : "bg-accent"
              }`}
            />

            <h3
              className={`mt-4 font-semibold tracking-tight ${
                highlight ? "text-2xl sm:text-3xl" : "text-lg"
              }`}
            >
              {project.title.split(" — ")[0]}
            </h3>

            <p
              className={`mt-3 leading-6 ${
                highlight
                  ? "max-w-md text-sm text-background/80 line-clamp-4 sm:text-[15px]"
                  : "text-[13px] text-muted line-clamp-2"
              }`}
            >
              {project.description}
            </p>

            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <span
                className={`text-xs font-medium ${
                  highlight ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                {project.tech.slice(0, highlight ? 4 : 2).join(" · ")}
              </span>
              <Arrow
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                  highlight
                    ? "text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    : "text-foreground/70 group-hover:translate-x-1 group-hover:text-accent"
                }`}
              />
            </div>
          </div>
        </button>
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
