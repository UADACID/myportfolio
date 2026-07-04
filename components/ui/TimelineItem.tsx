"use client";

import { motion } from "framer-motion";
import { fadeLeft } from "@/lib/motion";
import type { Experience } from "@/content/experience";

type TimelineItemProps = {
  item: Experience;
  isLast: boolean;
};

export function TimelineItem({ item, isLast }: TimelineItemProps) {
  return (
    <motion.li className="relative pl-8 pb-8 last:pb-0" variants={fadeLeft}>
      {!isLast && (
        <span
          className="absolute left-[7px] top-3 h-[calc(100%-4px)] w-px bg-border"
          aria-hidden
        />
      )}
      <span
        className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background"
        aria-hidden
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground">{item.role}</h3>
          <p className="mt-0.5 text-sm text-accent">{item.company}</p>
          {item.location && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {item.location}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {item.summary}
          </p>
        </div>
        <time className="shrink-0 font-mono text-xs sm:text-sm text-muted-foreground sm:pt-0.5">
          {item.period}
        </time>
      </div>
    </motion.li>
  );
}
