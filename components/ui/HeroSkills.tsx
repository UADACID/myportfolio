"use client";

import { skills } from "@/content/skills";

/**
 * Compact auto-scrolling strip of skill chips for the Hero — pairs with the
 * project showcase. Scrolls the opposite direction, with faded edges.
 */
export function HeroSkills() {
  const items = skills.flatMap((group) => group.items);
  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div className="hero-marquee-mask relative w-full overflow-hidden py-1">
      <ul className="hero-marquee-track hero-marquee-track--reverse flex w-max items-center gap-3">
        {loop.map((skill, index) => (
          <li key={`${skill}-${index}`} className="shrink-0">
            <span className="inline-flex items-center rounded-md border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[13px] text-foreground/90 shadow-sm backdrop-blur-sm">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
