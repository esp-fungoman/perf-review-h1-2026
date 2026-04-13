"use client";

import { Reveal } from "@/components/reveal";

interface MilestoneCardProps {
  title:      string;
  highlights: string[];
  index:      number;
}

export function MilestoneCard({ title, highlights, index }: MilestoneCardProps) {
  return (
    <Reveal delay={0.08 * index}>
      <div className="border-b border-border/40 pb-5 last:border-b-0 last:pb-0">
        <h3 className="text-base font-semibold leading-snug">{title}</h3>
        <ul className="mt-2 space-y-1.5 text-sm leading-snug text-muted-foreground">
          {(highlights ?? []).map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
