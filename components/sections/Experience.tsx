"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/experience";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { staggerContainer } from "@/lib/motion";

export function Experience() {
  return (
    <AnimatedSection id="experience">
      <SectionHeading
        label="// experience"
        title="Work Experience"
        description="Roles I've held and what I worked on."
      />

      <motion.ol
        className="list-none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {experience.map((item, index) => (
          <TimelineItem
            key={`${item.company}-${item.period}`}
            item={item}
            isLast={index === experience.length - 1}
          />
        ))}
      </motion.ol>
    </AnimatedSection>
  );
}
