"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { createTimeline, createTimer } from "animejs";
import type { Timeline } from "animejs";
import {
  PaperPlaneOverlay,
  type PaperPlaneOverlayHandle,
} from "@/components/ui/PaperPlaneOverlay";
import {
  buildControlPoints,
  cubicBezier,
  flightCurveProgress,
  getScrollTargetY,
  getTargetPoint,
  PAPER_PLANE,
  rotationFromVelocity,
  type Point,
} from "@/lib/paperPlaneFlight";

const TARGET_ID = "projects";

export function ViewMyWorkButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<PaperPlaneOverlayHandle>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const trailRef = useRef<Point[]>([]);
  const lastPointRef = useRef<Point | null>(null);
  const startScrollRef = useRef(0);
  const scrollTargetRef = useRef(0);
  const flightStartRef = useRef<Point | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const reduced = useReducedMotion();

  const resetButton = useCallback(() => {
    const button = buttonRef.current;
    const label = labelRef.current;
    const icon = iconRef.current;

    if (button) {
      button.style.width = "";
      button.style.height = "";
      button.style.padding = "";
      button.style.borderRadius = "";
      button.style.opacity = "1";
    }
    if (label) label.style.opacity = "1";
    if (icon) icon.style.opacity = "0";

    trailRef.current = [];
    lastPointRef.current = null;
    overlayRef.current?.hide();
    setIsAnimating(false);
  }, []);

  const cancelTimeline = useCallback(() => {
    timelineRef.current?.cancel();
    timelineRef.current = null;
  }, []);

  useEffect(() => () => cancelTimeline(), [cancelTimeline]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (isAnimating) return;

      const button = buttonRef.current;
      const targetY = getScrollTargetY(TARGET_ID);
      if (!button || targetY === null) return;

      if (reduced) {
        document.getElementById(TARGET_ID)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      cancelTimeline();

      const from = button.getBoundingClientRect();
      flightStartRef.current = {
        x: from.left + from.width / 2,
        y: from.top + from.height / 2,
      };

      startScrollRef.current = window.scrollY;
      scrollTargetRef.current = targetY;
      trailRef.current = [];
      lastPointRef.current = null;

      setIsAnimating(true);

      const morphTimer = createTimer({
        duration: PAPER_PLANE.morphDuration,
        onUpdate: (self) => {
          const p = 1 - (1 - self.progress) ** 2;
          const size = 44;

          button.style.width = `${from.width + (size - from.width) * p}px`;
          button.style.height = `${from.height + (size - from.height) * p}px`;
          button.style.padding = `${12 * (1 - p)}px ${24 * (1 - p)}px`;
          button.style.borderRadius = `${8 + (9999 - 8) * p}px`;

          if (labelRef.current) labelRef.current.style.opacity = String(1 - p);
          if (iconRef.current) {
            iconRef.current.style.opacity = String(Math.max(0, (p - 0.25) / 0.75));
            iconRef.current.style.transform = `rotate(${-45 * p}deg) scale(${0.6 + p * 0.4})`;
          }
        },
        onComplete: () => {
          button.style.opacity = "0";
          overlayRef.current?.show();
        },
      });

      const flightTimer = createTimer({
        duration: PAPER_PLANE.flightDuration,
        onUpdate: (self) => {
          const t = self.progress;
          const pathT = flightCurveProgress(t);
          const start = flightStartRef.current;
          if (!start) return;

          const scrollY =
            startScrollRef.current +
            (scrollTargetRef.current - startScrollRef.current) * pathT;
          window.scrollTo(0, scrollY);

          const end = getTargetPoint(TARGET_ID);
          if (!end) return;

          const [p0, p1, p2, p3] = buildControlPoints(start, end);
          const point = cubicBezier(p0, p1, p2, p3, pathT);

          const prev = lastPointRef.current ?? point;
          const rotate = rotationFromVelocity(point.x - prev.x, point.y - prev.y);
          lastPointRef.current = point;

          const trail = [...trailRef.current, point].slice(-PAPER_PLANE.trailLength);
          trailRef.current = trail;

          overlayRef.current?.update({
            x: point.x,
            y: point.y,
            rotate,
            opacity: t > 0.92 ? 1 - (t - 0.92) / 0.08 : 1,
            trail,
          });
        },
        onComplete: () => {
          window.scrollTo(0, scrollTargetRef.current);
          resetButton();
        },
      });

      timelineRef.current = createTimeline({ autoplay: false })
        .sync(morphTimer)
        .sync(flightTimer, PAPER_PLANE.morphDuration)
        .play();
    },
    [cancelTimeline, isAnimating, reduced, resetButton]
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        disabled={isAnimating}
        aria-label="View my work"
        className="relative inline-flex items-center justify-center overflow-hidden bg-accent text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02] disabled:pointer-events-none"
      >
        <span ref={labelRef} className="inline-flex items-center gap-2 px-6 py-3">
          View My Work
        </span>
        <span
          ref={iconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
          aria-hidden
        >
          <Send className="h-5 w-5" />
        </span>
      </button>

      <PaperPlaneOverlay ref={overlayRef} />
    </>
  );
}
