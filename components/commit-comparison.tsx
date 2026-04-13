"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

interface RepoRow {
  repo:  string;
  mine:  number;
  total: number;
}

interface CommitComparisonProps {
  rows:    RepoRow[];
  myTotal: number;
}

export function CommitComparison({ rows, myTotal }: CommitComparisonProps) {
  const sorted = [...rows].sort((a, b) => b.total - a.total);
  const maxTotal = sorted[0]?.total ?? 1;

  const cardRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(cardRef, { once: true, amount: 0.3, margin: "-48px 0px" });

  const [myTotalShown, setMyTotalShown] = useState(0);

  useEffect(() => {
    if (!chartInView) return;

    const totalCtrl = animate(0, myTotal, {
      duration: 0.9,
      ease,
      onUpdate: (v) => setMyTotalShown(Math.round(v)),
    });

    return () => {
      totalCtrl.stop();
    };
  }, [chartInView, myTotal]);

  return (
    <Reveal>
      <div
        ref={cardRef}
        className="mt-6 rounded-xl border border-border/90 bg-gradient-to-b from-card to-muted/30 p-6 shadow-sm ring-1 ring-inset ring-primary/5"
      >
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Commit share
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0">
              <span className="text-2xl font-bold tabular-nums">{myTotalShown}</span>
              <span className="text-base font-medium text-muted-foreground">commits</span>
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
              Mine
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-muted-foreground/25" />
              Others
            </span>
          </div>
        </div>

        {/* Bars — single scroll root: chartInView drives width + stagger */}
        <div className="space-y-4">
          {sorted.map((row, i) => {
            const myPct    = (row.mine / maxTotal) * 100;
            const otherPct = ((row.total - row.mine) / maxTotal) * 100;
            const myShare  = Math.round((row.mine / row.total) * 100);
            const barDelay = 0.08 * i;
            const mineDelay = barDelay + 0.08;

            return (
              <div key={row.repo}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{row.repo}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    <span className="font-semibold text-foreground">{row.mine}</span>
                    {" / "}
                    {row.total}
                    <span className="ml-2 text-primary">({myShare}%)</span>
                  </span>
                </div>
                <div className="relative h-5 w-full overflow-hidden rounded-md bg-muted/40">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-md bg-muted-foreground/20"
                    initial={false}
                    animate={{ width: chartInView ? `${otherPct + myPct}%` : "0%" }}
                    transition={{ duration: 0.65, delay: barDelay, ease }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-md bg-primary"
                    initial={false}
                    animate={{ width: chartInView ? `${myPct}%` : "0%" }}
                    transition={{ duration: 0.65, delay: mineDelay, ease }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
