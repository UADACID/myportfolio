"use client";

import { skills } from "@/content/skills";

/** Top skills shown as static chips near the Hero intro. */
const MAX_CHIPS = 8;

export function HeroSkills() {
  const items = skills.flatMap((group) => group.items).slice(0, MAX_CHIPS);
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <li key={skill}>
          <span className="inline-flex items-center rounded-md border border-border bg-surface/60 px-3 py-1.5 font-mono text-[12px] text-foreground/90 shadow-sm backdrop-blur-sm">
            {skill}
          </span>
        </li>
      ))}
    </ul>
  );
}
