"use client";

import { Reveal } from "@/components/reveal";

interface ConcernCardProps {
  title:   string;
  bullets: readonly string[];
  index:   number;
}

export function ConcernCard({ title, bullets, index }: ConcernCardProps) {
  return (
    <Reveal delay={0.08 * index}>
      <div className="rounded-xl border border-border/80 border-l-4 border-l-primary/90 bg-card/90 bg-gradient-to-r from-muted/30 to-card p-5 shadow-sm ring-1 ring-border/40 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-sm font-semibold text-muted-foreground shadow-inner">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-snug">{title}</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-snug text-muted-foreground">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
