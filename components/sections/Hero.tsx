"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";
import { ActionButton } from "@/components/ui/ActionButton";
import { ViewMyWorkButton } from "@/components/ui/ViewMyWorkButton";
import { HeroShowcase } from "@/components/ui/HeroShowcase";
import { HeroSkills } from "@/components/ui/HeroSkills";
import { HeroFeatured } from "@/components/ui/HeroFeatured";
import { fadeUp, heroStagger } from "@/lib/motion";

const socialIcons = {
  github: GitHubIcon,
  mail: Mail,
} as const;

export function Hero() {
  return (
    <section className="relative z-10 flex min-h-svh items-center overflow-visible px-6 pt-28 pb-20">
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/10 bg-background/35 p-7 shadow-sm backdrop-blur-sm dark:bg-background/30 sm:p-9"
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
              className="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 bg-[linear-gradient(90deg,var(--accent),color-mix(in_srgb,var(--accent)_55%,var(--foreground)))] bg-clip-text text-xl font-semibold text-transparent sm:text-2xl"
            >
              {site.role}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/80"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-5 flex flex-wrap items-center gap-3"
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

            <motion.div variants={fadeUp} className="mt-6">
              <HeroSkills />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-4"
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
              className="mt-6 flex items-center gap-3"
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
          </motion.div>

          <motion.div variants={fadeUp} className="w-full">
            <HeroFeatured />
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-12">
          <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Recent work
          </p>
          <HeroShowcase />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <ActionButton
            href="#about"
            aria-label="Scroll to about section"
            className="animate-bounce text-muted/70 transition-colors hover:text-accent"
          >
            <ArrowDown className="h-5 w-5" />
          </ActionButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
