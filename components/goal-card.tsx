"use client";

import { Reveal } from "@/components/reveal";

interface GoalCardProps {
  number:  string;
  title:   string;
  bullets: readonly string[];
  index:   number;
}

export function GoalCard({ number, title, bullets, index }: GoalCardProps) {
  return (
    <Reveal delay={0.07 * index}>
      <div className="flex h-full flex-col rounded-xl border border-border/80 border-t-[3px] border-t-primary/70 bg-gradient-to-b from-accent/25 to-card p-5 shadow-md shadow-primary/6 ring-1 ring-primary/8 sm:p-6">
        <p className="text-3xl font-bold tracking-tight text-primary">{number}</p>
        <h3 className="mt-2 font-semibold leading-snug">{title}</h3>
        <ul className="mt-2 flex-1 space-y-1.5 text-sm leading-snug text-muted-foreground">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
