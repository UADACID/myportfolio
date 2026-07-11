export const PAPER_PLANE = {
  morphDuration: 250,
  flightDuration: 1600,
  scrollOffset: 112,
  risePhase: 0.45,
  peakHeight: 220,
  trailLength: 16,
  planeSize: 40,
} as const;

export type Point = { x: number; y: number };

export function cubicBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

/** Map timeline progress to curve parameter: slow rise, then accelerating dive. */
export function flightCurveProgress(raw: number): number {
  const { risePhase } = PAPER_PLANE;

  if (raw <= risePhase) {
    const local = raw / risePhase;
    const eased = 1 - (1 - local) ** 2;
    return eased * 0.52;
  }

  const local = (raw - risePhase) / (1 - risePhase);
  return 0.52 + local ** 1.7 * 0.48;
}

export function buildControlPoints(start: Point, end: Point): [Point, Point, Point, Point] {
  const rise = Math.max(
    PAPER_PLANE.peakHeight,
    window.innerHeight * 0.24
  );

  return [
    start,
    {
      x: start.x + (end.x - start.x) * 0.08,
      y: start.y - rise * 0.35,
    },
    {
      x: start.x + (end.x - start.x) * 0.38,
      y: start.y - rise,
    },
    end,
  ];
}

export function rotationFromVelocity(dx: number, dy: number): number {
  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return -45;
  return (Math.atan2(dy, dx) * 180) / Math.PI + 45;
}

export function getTargetPoint(targetId: string): Point | null {
  const target = document.getElementById(targetId);
  if (!target) return null;

  const rect = target.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + 72,
  };
}

export function getScrollTargetDocumentY(targetId: string): number | null {
  const target = document.getElementById(targetId);
  if (!target) return null;

  return target.offsetTop - PAPER_PLANE.scrollOffset;
}

export function getScrollTargetY(targetId: string): number | null {
  return getScrollTargetDocumentY(targetId);
}
