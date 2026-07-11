"use client";

import Image from "next/image";
import { projects } from "@/content/projects";
import { followHref } from "@/lib/motion";

/**
 * Compact auto-scrolling showcase of project covers for the Hero — a subtle
 * "storefront" strip with faded edges. Pauses on hover, respects reduced motion.
 */
export function HeroShowcase() {
  const items = projects.filter((p) => p.image);
  if (items.length === 0) return null;

  // Duplicate for a seamless -50% loop
  const loop = [...items, ...items];

  const goToProjects = (event: React.MouseEvent) => {
    event.preventDefault();
    followHref("#projects");
  };

  return (
    <div className="hero-marquee-mask relative w-full overflow-hidden py-1">
      <ul className="hero-marquee-track flex w-max items-center gap-4">
        {loop.map((project, index) => (
          <li key={`${project.title}-${index}`} className="shrink-0">
            <a
              href="#projects"
              onClick={goToProjects}
              aria-label={`View ${project.title} in projects`}
              className="group relative block h-32 w-48 overflow-hidden rounded-lg ring-1 ring-black/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-accent/60 dark:ring-white/10"
            >
              <Image
                src={project.image!}
                alt=""
                fill
                sizes="192px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
              <span className="absolute inset-x-0 bottom-0 truncate px-2.5 pb-2 text-left text-[11px] font-medium text-white/95">
                {project.title.split(" — ")[0]}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
