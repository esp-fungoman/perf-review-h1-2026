"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Concern, Goal } from "@/lib/pebbles-data";

interface ConcernMindMapProps {
  concern: Concern;
  goal?: Goal;
  index: number;
}

const CENTER_R = 52;   // center node radius px
const SAT_R    = 44;   // satellite node radius px
const RADIUS   = 168;  // distance from center to satellite center

// Truncate a string to the first `n` words
function truncate(text: string, words = 6): string {
  const parts = text.split(" ");
  if (parts.length <= words) return text;
  return parts.slice(0, words).join(" ") + "…";
}

// Evenly distribute N nodes in a fan from startDeg to endDeg (degrees)
function fanPositions(n: number, startDeg = -60, endDeg = 60) {
  if (n === 1) return [0];
  return Array.from({ length: n }, (_, i) => startDeg + ((endDeg - startDeg) / (n - 1)) * i);
}

// Compute line endpoints offset by node radii so lines start/end at node edges
function lineEndpoints(
  cx: number,
  cy: number,
  sx: number,
  sy: number,
): { x1: number; y1: number; x2: number; y2: number } {
  const dx = sx - cx;
  const dy = sy - cy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: cx + ux * CENTER_R,
    y1: cy + uy * CENTER_R,
    x2: sx - ux * SAT_R,
    y2: sy - uy * SAT_R,
  };
}

export function ConcernMindMap({ concern, goal, index }: ConcernMindMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bullets = goal?.bullets ?? concern.bullets;
  const angles  = fanPositions(bullets.length, -58, 58);

  // Container dimensions (fixed so math is stable SSR + CSR)
  const W = 640;
  const H = 320;
  const cx = W / 2;
  const cy = 118;

  const satellites = angles.map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const sx  = cx + RADIUS * Math.cos(rad);
    const sy  = cy + RADIUS * Math.sin(rad);
    return { sx, sy, bullet: bullets[i], line: lineEndpoints(cx, cy, sx, sy) };
  });

  return (
    <>
      {/* ── Desktop mind-map (md+) ─────────────────────────── */}
      <div
        ref={ref}
        className="relative hidden md:block"
        style={{ width: "100%", height: H }}
        aria-label={concern.title}
      >
        {/* SVG layer — lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {satellites.map(({ line }, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="oklch(0.6 0.2 25 / 0.35)"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.45, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
                opacity:    { duration: 0.01, delay: 0.3 + i * 0.12 },
              }}
            />
          ))}
        </svg>

        {/* Center node */}
        <motion.div
          className="absolute flex flex-col items-center justify-center rounded-full border-2 border-primary/70 bg-card text-center shadow-md shadow-primary/10 ring-4 ring-primary/10"
          style={{
            width:  CENTER_R * 2,
            height: CENTER_R * 2,
            left:   cx - CENTER_R,
            top:    cy - CENTER_R,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0 }}
        >
          <span className="px-2 text-[10px] font-semibold leading-tight text-foreground/80">
            {truncate(concern.title, 4)}
          </span>
          {concern.planRef && (
            <a
              href={`#goal-${concern.planRef}`}
              className="mt-0.5 text-[9px] font-semibold text-primary/70 hover:text-primary"
            >
              plan #{concern.planRef}
            </a>
          )}
        </motion.div>

        {/* Satellite nodes */}
        {satellites.map(({ sx, sy, bullet }, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center rounded-full border border-border/80 bg-accent/40 text-center shadow-sm ring-1 ring-primary/8"
            style={{
              width:  SAT_R * 2,
              height: SAT_R * 2,
              left:   sx - SAT_R,
              top:    sy - SAT_R,
            }}
            title={bullet}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.55 + i * 0.12 }}
          >
            <span className="px-2 text-[9px] leading-tight text-muted-foreground">
              {truncate(bullet, 5)}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Mobile fallback — plain stacked card ────────────── */}
      <div className="block md:hidden rounded-xl border border-border/80 border-l-4 border-l-primary/90 bg-card/90 bg-gradient-to-r from-muted/30 to-card p-5 shadow-sm ring-1 ring-border/40">
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-sm font-semibold text-muted-foreground shadow-inner">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-snug">{concern.title}</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-snug text-muted-foreground">
              {concern.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {concern.planRef && (
              <a
                href={`#goal-${concern.planRef}`}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary/80 transition-colors hover:text-primary"
              >
                See plan
                <span className="rounded border border-primary/30 bg-primary/8 px-1.5 py-0.5 font-mono tracking-tight">
                  #{concern.planRef}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
