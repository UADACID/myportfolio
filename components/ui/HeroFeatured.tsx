"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProject } from "@/content/projects";
import { followHref } from "@/lib/motion";

/**
 * Spotlight card for the Hero right column: the featured project with a subtle
 * float and a peeking card behind for depth. Clicking scrolls to #projects.
 */
export function HeroFeatured() {
  const reduced = useReducedMotion();
  const project = featuredProject;

  if (!project?.image) return null;

  const goToProjects = (event: React.MouseEvent) => {
    event.preventDefault();
    followHref("#projects");
  };

  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0">
      {/* Peek card behind for depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-4 translate-y-5 rotate-3 rounded-2xl border border-border bg-surface/40 shadow-sm backdrop-blur-sm"
      />

      <motion.a
        href="#projects"
        onClick={goToProjects}
        aria-label={`View ${project.title} in projects`}
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 6, ease: "easeInOut", repeat: Infinity }
        }
        whileHover={{ y: -4 }}
        className="group relative block overflow-hidden rounded-2xl border border-border bg-surface/70 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 448px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] font-medium text-white/90 backdrop-blur-sm">
            Featured
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.title.split(" — ")[0]}
            </h3>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>

          <p className="mt-2 text-[13px] leading-6 text-muted line-clamp-2">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </div>
  );
}
