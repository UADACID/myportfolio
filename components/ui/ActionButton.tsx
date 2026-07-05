"use client";

import { useState } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { followHref } from "@/lib/motion";

async function playPressAnimation(
  controls: ReturnType<typeof useAnimationControls>,
  reduced: boolean
) {
  if (reduced) return;

  await controls.start({
    scale: [0.94, 1.03, 1],
    transition: {
      duration: 0.22,
      times: [0, 0.42, 1],
      ease: [0.34, 1.2, 0.64, 1],
    },
  });
}

type ActionButtonProps = {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  onAfterAction?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  instant?: boolean;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
};

export function ActionButton({
  href,
  external,
  onClick,
  onAfterAction,
  className = "",
  children,
  type = "button",
  disabled = false,
  instant = false,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
}: ActionButtonProps) {
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const [busy, setBusy] = useState(false);

  const runAction = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (busy || disabled) return;

    setBusy(true);
    try {
      if (!instant) {
        await playPressAnimation(controls, !!reduced);
      }
      if (href) followHref(href, external);
      onClick?.();
      onAfterAction?.();
    } finally {
      setBusy(false);
    }
  };

  const motionProps = {
    animate: controls,
    whileHover:
      instant || reduced || disabled ? undefined : { scale: 1.02 },
    className,
    "aria-label": ariaLabel,
    "aria-expanded": ariaExpanded,
    onClick: runAction,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || busy}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
