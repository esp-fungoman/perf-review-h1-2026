"use client";

import { Reveal } from "@/components/reveal";

interface ConcernCardProps {
  title:    string;
  bullets:  readonly string[];
  planRef?: string;
  index:    number;
}

export function ConcernCard({ title, bullets, planRef, index }: ConcernCardProps) {
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
            {planRef && (
              <a
                href={`#goal-${planRef}`}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary/80 transition-colors hover:text-primary"
              >
                See plan
                <span className="rounded border border-primary/30 bg-primary/8 px-1.5 py-0.5 font-mono tracking-tight">
                  #{planRef}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
