"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import type { Experience } from "@/content/experience";

type ExperienceItemProps = {
  item: Experience;
  isLast: boolean;
};

export function ExperienceItem({ item, isLast }: ExperienceItemProps) {
  return (
    <motion.li
      className="relative pl-7 pb-10 last:pb-0"
      variants={fadeUp}
    >
      {!isLast && (
        <span
          className="absolute left-[3px] top-2 h-[calc(100%-4px)] w-px bg-border"
          aria-hidden
        />
      )}
      <span
        className="absolute left-0 top-[7px] h-[7px] w-[7px] rounded-full bg-foreground"
        aria-hidden
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-[15px] font-medium text-foreground">{item.role}</h3>
        <time className="shrink-0 font-mono text-xs text-muted-foreground">
          {item.period}
        </time>
      </div>
      <p className="mt-1 text-sm text-muted">
        {item.company}
        {item.location && (
          <span className="text-muted-foreground"> · {item.location}</span>
        )}
      </p>
      <p className="mt-3 text-[15px] leading-7 text-muted">{item.summary}</p>
    </motion.li>
  );
}
