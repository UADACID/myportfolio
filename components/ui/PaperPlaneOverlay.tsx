"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { Send } from "lucide-react";
import type { Point } from "@/lib/paperPlaneFlight";
import { PAPER_PLANE } from "@/lib/paperPlaneFlight";

export type PlaneFrame = {
  x: number;
  y: number;
  rotate: number;
  opacity: number;
  trail: Point[];
};

export type PaperPlaneOverlayHandle = {
  show: () => void;
  hide: () => void;
  update: (frame: PlaneFrame) => void;
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

export const PaperPlaneOverlay = forwardRef<PaperPlaneOverlayHandle>(
  function PaperPlaneOverlay(_, ref) {
    const mounted = useSyncExternalStore(
      subscribe,
      getClientSnapshot,
      getServerSnapshot
    );
    const rootRef = useRef<HTMLDivElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const tailLineRef = useRef<SVGPolylineElement>(null);
    const tailGlowRef = useRef<SVGPolylineElement>(null);

    useImperativeHandle(ref, () => ({
      show() {
        if (rootRef.current) rootRef.current.style.display = "block";
      },
      hide() {
        if (rootRef.current) rootRef.current.style.display = "none";
      },
      update({ x, y, rotate, opacity, trail }) {
        const half = PAPER_PLANE.planeSize / 2;

        if (planeRef.current) {
          planeRef.current.style.transform = `translate3d(${x - half}px, ${y - half}px, 0) rotate(${rotate}deg)`;
          planeRef.current.style.opacity = String(opacity);
        }

        const points =
          trail.length > 1
            ? trail.map((point) => `${point.x},${point.y}`).join(" ")
            : "";

        if (tailLineRef.current) tailLineRef.current.setAttribute("points", points);
        if (tailGlowRef.current) tailGlowRef.current.setAttribute("points", points);
      },
    }));

    if (!mounted) return null;

    return createPortal(
      <div
        ref={rootRef}
        className="pointer-events-none fixed inset-0 z-[200] hidden"
        aria-hidden
      >
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="plane-tail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.95" />
            </linearGradient>
            <filter id="plane-tail-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polyline
            ref={tailGlowRef}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
            filter="url(#plane-tail-glow)"
          />
          <polyline
            ref={tailLineRef}
            fill="none"
            stroke="url(#plane-tail)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          ref={planeRef}
          className="absolute left-0 top-0 flex items-center justify-center text-accent will-change-transform"
          style={{ width: PAPER_PLANE.planeSize, height: PAPER_PLANE.planeSize }}
        >
          <Send className="h-5 w-5 drop-shadow-sm" strokeWidth={2.25} />
        </div>
      </div>,
      document.body
    );
  }
);
