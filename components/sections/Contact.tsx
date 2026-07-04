"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
} as const;

export function Contact() {
  return (
    <AnimatedSection id="contact">
      <SectionHeading
        label="// contact"
        title="Get In Touch"
        description="Have a project in mind or just want to say hi? I'd love to hear from you."
      />

      <motion.div
        className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeUp}
          className="text-lg text-muted max-w-lg mx-auto leading-relaxed"
        >
          I&apos;m currently open to new opportunities and collaborations.
          Whether you have a question or just want to connect, my inbox is
          always open.
        </motion.p>

        <motion.a
          variants={fadeUp}
          href={`mailto:${site.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Mail className="h-5 w-5" />
          {site.email}
        </motion.a>

        {"phone" in site && site.phone ? (
          <motion.p variants={fadeUp} className="mt-4 text-sm text-muted">
            {site.phone}
          </motion.p>
        ) : null}

        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-4"
        >
          {site.social.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-accent hover:bg-accent-muted"
              >
                <Icon className="h-4 w-4" />
                {link.label}
                {link.icon !== "mail" && (
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                )}
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
