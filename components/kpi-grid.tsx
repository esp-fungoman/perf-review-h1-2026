"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

interface KpiCard {
  label: string;
  value: string;
  sub:   string;
}

export function KpiGrid({ cards }: { cards: readonly KpiCard[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.35, margin: "-40px 0px" });

  const targets = useMemo(
    () => cards.map((c) => {
      const n = Number.parseInt(c.value, 10);
      return Number.isFinite(n) ? n : 0;
    }),
    [cards],
  );

  const [displayed, setDisplayed] = useState(() => targets.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    const controls = targets.map((target, i) =>
      animate(0, target, {
        duration: 0.85,
        delay: 0.1 * i,
        ease,
        onUpdate: (v) => {
          const rounded = Math.round(v);
          setDisplayed((prev) => {
            if (prev[i] === rounded) return prev;
            const next = [...prev];
            next[i] = rounded;
            return next;
          });
        },
      }),
    );

    return () => {
      controls.forEach((c) => c.stop());
    };
  }, [inView, targets]);

  return (
    <div ref={gridRef} className="mt-10 flex flex-wrap items-stretch justify-center gap-6">
      {cards.map((card, i) => (
        <Reveal key={card.label} delay={0.07 * i} className="h-full w-full sm:w-56">
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-border/90 bg-card bg-gradient-to-b from-card to-muted/40 px-6 py-7 text-center shadow-md shadow-primary/4 ring-1 ring-inset ring-primary/6">
            <p className="text-4xl font-bold tracking-tight text-primary drop-shadow-sm tabular-nums">
              {displayed[i] ?? 0}
            </p>
            <p className="mt-2 text-sm font-medium">{card.label}</p>
            {card.sub.trim() ? (
              <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
            ) : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
