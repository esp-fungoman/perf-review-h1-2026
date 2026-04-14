"use client";

import { Reveal } from "@/components/reveal";
import type { Concern, Goal } from "@/lib/pebbles-data";

interface ChallengeResponseCardProps {
  concern: Concern;
  goal: Goal;
  index: number;
}

export function ChallengeResponseCard({
  concern,
  goal,
  index,
}: ChallengeResponseCardProps) {
  return (
    <Reveal delay={0.08 * index}>
      <div className="rounded-2xl border border-border/80 bg-card/90 shadow-sm ring-1 ring-border/40">
        <div className="grid grid-cols-1 divide-y divide-border/70 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="border-l-4 border-l-primary/90 bg-gradient-to-r from-muted/35 to-card p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-sm font-semibold text-muted-foreground shadow-inner">
                {index + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Challenge
                </p>
                <h3 className="mt-1 font-semibold leading-snug">{concern.title}</h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-snug text-muted-foreground">
                  {concern.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t-[3px] border-t-primary/70 bg-gradient-to-b from-accent/25 to-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Response plan
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-primary">
              {goal.number}
            </p>
            <h3 className="mt-2 font-semibold leading-snug">{goal.title}</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-snug text-muted-foreground">
              {goal.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
