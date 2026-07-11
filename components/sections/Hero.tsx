"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { ActionButton } from "@/components/ui/ActionButton";
import { ViewMyWorkButton } from "@/components/ui/ViewMyWorkButton";
import { fadeUp, heroStagger } from "@/lib/motion";

const socialIcons = {
  github: GitHubIcon,
  mail: Mail,
} as const;

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-28">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <motion.div
        className="mx-auto w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-sm tracking-[0.02em] text-label"
        >
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
          className="mt-4 text-xl font-medium text-muted sm:text-2xl"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-[15px] leading-7 text-muted"
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

        <motion.div variants={fadeUp} className="mt-20 flex justify-center">
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
