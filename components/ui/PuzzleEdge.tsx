const VIEW_W = 1440;
const EDGE_H = 120;
const SEAM = 56;

/** Climb into the previous section — matches EDGE_H so curves align with the hero cut */
export const PUZZLE_OVERLAP = EDGE_H;
export const PUZZLE_EDGE_VIEW_H = EDGE_H;

type Wave = {
  phase: number;
  amps: [number, number, number, number];
  bumps: { x: number; h: number; w: number }[];
};

const VARIANTS: Wave[] = [
  {
    phase: 0.2,
    amps: [14, 9, 6, 3.5],
    bumps: [
      { x: 0.12, h: 28, w: 0.1 },
      { x: 0.28, h: -22, w: 0.08 },
      { x: 0.48, h: 32, w: 0.13 },
      { x: 0.67, h: -24, w: 0.09 },
      { x: 0.84, h: 26, w: 0.11 },
    ],
  },
  {
    phase: 1.1,
    amps: [12, 10, 5, 4],
    bumps: [
      { x: 0.08, h: -20, w: 0.09 },
      { x: 0.22, h: 30, w: 0.12 },
      { x: 0.41, h: -26, w: 0.1 },
      { x: 0.58, h: 22, w: 0.08 },
      { x: 0.76, h: -23, w: 0.11 },
      { x: 0.92, h: 27, w: 0.09 },
    ],
  },
  {
    phase: 2.4,
    amps: [15, 8, 7, 3],
    bumps: [
      { x: 0.15, h: 25, w: 0.11 },
      { x: 0.35, h: -30, w: 0.12 },
      { x: 0.55, h: 28, w: 0.1 },
      { x: 0.72, h: -20, w: 0.08 },
      { x: 0.9, h: 31, w: 0.13 },
    ],
  },
  {
    phase: 0.7,
    amps: [13, 9, 5, 4.5],
    bumps: [
      { x: 0.1, h: -23, w: 0.09 },
      { x: 0.26, h: 27, w: 0.1 },
      { x: 0.45, h: -18, w: 0.07 },
      { x: 0.6, h: 34, w: 0.14 },
      { x: 0.8, h: -25, w: 0.11 },
    ],
  },
  {
    phase: 3.0,
    amps: [11, 11, 6, 3],
    bumps: [
      { x: 0.14, h: 29, w: 0.12 },
      { x: 0.32, h: -24, w: 0.09 },
      { x: 0.5, h: 20, w: 0.08 },
      { x: 0.68, h: -31, w: 0.13 },
      { x: 0.88, h: 27, w: 0.1 },
    ],
  },
  {
    phase: 1.8,
    amps: [14, 7, 8, 3.5],
    bumps: [
      { x: 0.06, h: 18, w: 0.08 },
      { x: 0.2, h: -28, w: 0.11 },
      { x: 0.4, h: 31, w: 0.12 },
      { x: 0.62, h: -22, w: 0.09 },
      { x: 0.78, h: 24, w: 0.1 },
      { x: 0.94, h: -19, w: 0.08 },
    ],
  },
];

function edgeY(x: number, wave: Wave): number {
  const t = x / VIEW_W;
  const { phase, amps, bumps } = wave;

  let y =
    SEAM +
    Math.sin(t * Math.PI * 2 + phase) * amps[0] +
    Math.sin(t * Math.PI * 4 + phase * 1.3) * amps[1] +
    Math.sin(t * Math.PI * 7 + phase * 0.7) * amps[2] +
    Math.cos(t * Math.PI * 11 + phase * 2.1) * amps[3];

  for (const bump of bumps) {
    const d = (t - bump.x) / bump.w;
    y -= bump.h * Math.exp(-d * d * 2.8);
  }

  return Math.min(EDGE_H - 14, Math.max(14, y));
}

/** Closed path: continuous organic top → flat bottom (joins body below). */
function buildEdgePath(wave: Wave): string {
  const steps = 64;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * VIEW_W;
    points.push({ x, y: edgeY(x, wave) });
  }

  let d = `M 0 ${EDGE_H} L 0 ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  d += ` L ${VIEW_W} ${EDGE_H} Z`;
  return d;
}

const EDGE_PATHS = VARIANTS.map(buildEdgePath);

export function getFillEdgePath(variant = 0): string {
  return EDGE_PATHS[
    ((variant % EDGE_PATHS.length) + EDGE_PATHS.length) % EDGE_PATHS.length
  ];
}

/** White-below-curve mask image (alpha) for the top edge strip. */
function buildFillMask(variant: number): string {
  const path = getFillEdgePath(variant);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${EDGE_H}" preserveAspectRatio="none"><path d="${path}" fill="white"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const FILL_MASKS = VARIANTS.map((_, i) => buildFillMask(i));

export type PuzzleEdgeProps = {
  fill: string;
  variant?: number;
  className?: string;
};

/**
 * Single background layer with an organic top mask. Because it is one paint
 * layer, semi-transparent fills stay a uniform alpha (no overlap hairline).
 * Extends past the section on both ends so neighbors cover the flat edges.
 */
export function PuzzleEdge({
  fill,
  variant = 0,
  className = "",
}: PuzzleEdgeProps) {
  const mask =
    FILL_MASKS[((variant % FILL_MASKS.length) + FILL_MASKS.length) % FILL_MASKS.length];

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-0 ${className}`}
      style={{
        top: -PUZZLE_OVERLAP,
        bottom: -PUZZLE_OVERLAP,
        backgroundColor: fill,
        // Layer 1: organic edge (top strip). Layer 2: solid fill for the body.
        WebkitMaskImage: `${mask}, linear-gradient(#fff, #fff)`,
        maskImage: `${mask}, linear-gradient(#fff, #fff)`,
        WebkitMaskSize: `100% ${EDGE_H}px, 100% calc(100% - ${EDGE_H - 1}px)`,
        maskSize: `100% ${EDGE_H}px, 100% calc(100% - ${EDGE_H - 1}px)`,
        WebkitMaskPosition: "top, bottom",
        maskPosition: "top, bottom",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
      aria-hidden
    />
  );
}
