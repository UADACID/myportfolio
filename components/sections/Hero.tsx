"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { TextLink } from "@/components/ui/TextLink";
import { heroItem, heroStagger } from "@/lib/motion";

export function Hero() {
  return (
    <section className="flex min-h-[85vh] items-end px-6 pb-20 pt-28 sm:items-center sm:pb-28">
      <motion.div
        className="mx-auto w-full max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <motion.p
          variants={heroItem}
          className="mb-8 text-xs text-muted-foreground"
        >
          {site.available && (
            <span className="text-foreground">Open to work</span>
          )}
          {site.available && site.location && (
            <span className="mx-2 text-muted-foreground">·</span>
          )}
          {site.location}
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="text-5xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mt-3 text-lg text-muted sm:text-xl"
        >
          {site.role}
        </motion.p>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-lg text-[15px] leading-7 text-muted"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <TextLink href="#projects">View work</TextLink>
          <TextLink href={`mailto:${site.email}`}>Email</TextLink>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mt-8 flex gap-5 text-sm text-muted"
        >
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.icon === "mail" ? undefined : "_blank"}
              rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
