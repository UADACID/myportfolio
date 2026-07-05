"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/content/site";
import { ActionButton } from "@/components/ui/ActionButton";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = site.nav.map((item) => item.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`nav-glass pointer-events-auto mx-auto max-w-5xl overflow-hidden rounded-2xl ${
          scrolled ? "nav-glass-scrolled" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-4 py-3 sm:px-5">
          <ActionButton
            href="#"
            className="text-sm font-medium text-foreground transition-opacity hover:opacity-70"
          >
            {site.name.split(" ")[0].toLowerCase()}.
          </ActionButton>

          <ul className="hidden items-center gap-0.5 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <ActionButton
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "font-medium text-nav-active"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </ActionButton>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <ActionButton
              className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </ActionButton>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-(--glass-divider) md:hidden"
            >
              <ul className="flex flex-col gap-0.5 p-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <ActionButton
                      href={item.href}
                      onAfterAction={() => setMobileOpen(false)}
                      className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        activeSection === item.href.replace("#", "")
                          ? "bg-surface font-medium text-nav-active"
                          : "text-muted hover:bg-surface/60 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </ActionButton>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
