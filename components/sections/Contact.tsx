"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

const socialIcons = {
  github: GitHubIcon,
  mail: Mail,
} as const;

export function Contact() {
  return (
    <AnimatedSection id="contact" tone="contact">
      <SectionHeading
        label="// contact"
        title="Get In Touch"
        description="Have a project in mind or just want to say hi? I'd love to hear from you."
      />

      <motion.div
        className="rounded-xl border border-border bg-surface-elevated p-8 text-center shadow-sm sm:p-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-lg text-[15px] leading-7 text-muted"
        >
          I&apos;m currently open to new opportunities and collaborations.
          Whether you have a question or just want to connect, my inbox is
          always open.
        </motion.p>

        <motion.div variants={fadeUp}>
          <ActionButton
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-accent-foreground"
          >
            <Mail className="h-5 w-5" />
            {site.email}
          </ActionButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-4"
        >
          {site.social.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <ActionButton
                key={link.label}
                href={link.href}
                external={link.icon !== "mail"}
                className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:bg-accent-muted hover:text-accent"
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {link.icon !== "mail" && (
                  <ArrowUpRight className="h-3 w-3 translate-x-0.5 -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                )}
              </ActionButton>
            );
          })}
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
