"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import { ActionButton } from "@/components/ui/ActionButton";
import { ViewMyWorkButton } from "@/components/ui/ViewMyWorkButton";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { HeroSkills } from "@/components/ui/HeroSkills";
import { fadeUp, heroStagger } from "@/lib/motion";

const socialIcons = {
  github: GitHubIcon,
  mail: Mail,
} as const;

export function Hero() {
  return (
    <section className="relative z-10 flex min-h-svh items-center overflow-visible px-6 pt-28 pb-24">
      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 inline-flex items-center gap-2.5 font-mono text-sm font-medium text-accent"
        >
          <span className="h-px w-7 bg-accent" aria-hidden />
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-4 bg-[linear-gradient(90deg,var(--accent),color-mix(in_srgb,var(--accent)_55%,var(--foreground)))] bg-clip-text text-xl font-semibold text-transparent sm:text-2xl"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-[15px] leading-7 text-foreground/80"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <ViewMyWorkButton />
          <ActionButton
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get In Touch
          </ActionButton>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex items-center gap-4"
        >
          {site.social.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <ActionButton
                key={link.label}
                href={link.href}
                external={link.icon !== "mail"}
                aria-label={link.label}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-muted hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </ActionButton>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-14">
          <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Recent work
          </p>
          <HeroShowcase />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6">
          <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Skills
          </p>
          <HeroSkills />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex justify-center"
        >
          <ActionButton
            href="#about"
            aria-label="Scroll to about section"
            className="animate-bounce text-muted transition-colors hover:text-accent"
          >
            <ArrowDown className="h-5 w-5" />
          </ActionButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
