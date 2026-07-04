"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import { heroStagger, fadeUp } from "@/lib/motion";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
} as const;

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-5xl w-full"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-sm text-accent mb-4"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-2xl sm:text-3xl font-medium text-muted"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg text-muted leading-relaxed"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex items-center gap-4"
        >
          {site.social.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="rounded-lg p-2 text-muted transition-colors hover:text-accent hover:bg-accent-muted"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-20 flex justify-center"
        >
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="animate-bounce text-muted hover:text-accent transition-colors"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
