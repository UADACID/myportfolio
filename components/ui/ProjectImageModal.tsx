"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { easeOut } from "@/lib/motion";

type ProjectImageModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
};

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ProjectImageModal({
  open,
  onClose,
  src,
  title,
}: ProjectImageModalProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const backdropTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: easeOut };

  const panelTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.4, ease: easeOut };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <motion.button
            type="button"
            aria-label="Close image preview"
            className="absolute inset-0 bg-background/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} preview`}
            className="relative z-10 w-full max-w-6xl"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 24 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 16 }
            }
            transition={panelTransition}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted shadow-lg transition-colors hover:text-foreground hover:border-accent sm:-top-4 sm:-right-4"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="relative max-h-[85vh] w-full">
                <Image
                  src={src}
                  alt={title}
                  width={1920}
                  height={1200}
                  className="h-auto max-h-[85vh] w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority
                />
              </div>
              <div className="border-t border-border px-4 py-3 sm:px-6">
                <p className="font-mono text-sm text-accent">{title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
