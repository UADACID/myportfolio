"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function About() {
  return (
    <AnimatedSection id="about" tone="about" className="pb-36">
      <SectionHeading label="// about" title="About Me" />

      <motion.div
        className="flex flex-col items-start gap-10 md:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="relative aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-2xl border border-border shadow-md sm:w-48"
        >
          <Image
            src="/about/portrait.png"
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(max-width: 640px) 160px, 192px"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="flex-1 space-y-4">
          {site.bio.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 40)}
              variants={fadeUp}
              className="text-[15px] leading-7 text-foreground/80"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <span className="inline-flex items-center gap-1.5 text-sm text-foreground/70">
              <MapPin className="h-4 w-4 text-accent" />
              {site.location}
            </span>
            {site.available && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Available for work
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
