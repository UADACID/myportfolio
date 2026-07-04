"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { modalBackdrop, modalPanel } from "@/lib/motion";

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

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <motion.button
            type="button"
            aria-label="Close image preview"
            className="absolute inset-0 bg-background/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: modalBackdrop.duration, ease: modalBackdrop.ease }
            }
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} preview`}
            className="relative z-10 w-full max-w-5xl"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: modalPanel.duration, ease: modalPanel.ease }
            }
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -right-2 -top-2 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-muted transition-colors hover:text-foreground sm:-right-3 sm:-top-3"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-lg border border-border/80 bg-surface-elevated">
              <div className="relative max-h-[85vh] w-full">
                <Image
                  src={src}
                  alt={title}
                  width={1920}
                  height={1200}
                  className="h-auto max-h-[85vh] w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
              </div>
              <div className="border-t border-border/50 px-4 py-3 sm:px-5">
                <p className="text-sm text-muted">{title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
