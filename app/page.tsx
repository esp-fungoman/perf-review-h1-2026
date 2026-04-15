import { Reveal } from "@/components/reveal";
import { Separator } from "@/components/ui/separator";
import { ChapterTabs } from "@/components/chapter-tabs";
import { MilestoneCard } from "@/components/milestone-card";
import { ProjectIntro } from "@/components/project-intro";
import { KpiGrid } from "@/components/kpi-grid";
import { ConcernFlow } from "@/components/concern-flow";
import { FeatureCard } from "@/components/feature-card";
import { CommitComparison } from "@/components/commit-comparison";
import {
  CHAPTERS,
  PEBBLES_PROJECT,
  KPI_CARDS,
  CONCERNS,
  GOALS,
  FEATURES,
  GITHUB_STATS,
} from "@/lib/pebbles-data";

// All scroll targets for the sticky nav
const NAV_ITEMS = [
  { id: "chapter-1", label: "Responsibilities & Scope" },
  { id: "metrics", label: "Engineering Impact" },
  { id: "featured-work", label: "Key Features Shipped" },
  { id: "concerns", label: "Concerns & Mitigations" },
  // { id: "whats-next",    label: "Next steps"    },
];

export default function Home() {
  return (
    <main className="relative">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/12 via-accent/30 to-background px-6 text-center">
        {/* Soft brand wash + corner glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.75_0.14_26/0.35),transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
          aria-hidden="true"
        />
        <Reveal delay={0.1}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            H1 Review Aug 2025 – Apr 2026
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="relative max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            <span
              className="pointer-events-none absolute -inset-x-8 -top-4 bottom-0 -z-10 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent blur-sm md:-inset-x-16"
              aria-hidden="true"
            />
            <span className="block">Six Months of</span>
            <span className="block text-primary">Shipping & Growing</span>
          </h1>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-6 max-w-xxl text-lg text-muted-foreground">
            A look at what I contributed, how I supported the team, and what I
            want to grow into.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-12 flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-px w-8 bg-border" />
            <span className="text-sm">Scroll to explore</span>
            <span className="inline-block h-px w-8 bg-border" />
          </div>
        </Reveal>
      </section>

      {/* ── Sticky nav ──────────────────────────────────────── */}
      <ChapterTabs chapters={NAV_ITEMS} />

      {/* ── Achievements timeline ────────────────────────────── */}
      <section className="border-t border-border/80 bg-gradient-to-b from-background to-muted/30 mx-auto max-w-3xl px-6 pb-16">
        {/* Project intro card */}
        <div className="pt-12">
          <ProjectIntro
            name={PEBBLES_PROJECT.name}
            logoPath={PEBBLES_PROJECT.logoPath}
            role={PEBBLES_PROJECT.role}
            scope={PEBBLES_PROJECT.scope}
            period={PEBBLES_PROJECT.period}
            summary={PEBBLES_PROJECT.summary}
          />
        </div>

        <Reveal delay={0.05}>
          <h2 className="mt-10 text-3xl font-bold mb-8">
            Responsibilities and scope
          </h2>
        </Reveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-3 top-0 h-full w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-24 pl-12">
            {CHAPTERS.map((chapter, i) => (
              <div key={chapter.id} id={chapter.id} className="scroll-mt-28">
                {/* Timeline dot */}
                <div className="absolute -left-[calc(3rem-0.6rem)] flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background" />

                {/* Chapter header */}
                <Reveal delay={0.05}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {chapter.period}
                  </p>
                  <h2 className="mt-1 text-3xl font-bold">
                    {i === 0 ? "Discovery & planning" : chapter.title}
                  </h2>
                </Reveal>

                {/* Milestones — title + bullets only */}
                <div className="mt-6 space-y-6">
                  {chapter.milestones.map((m, j) => (
                    <MilestoneCard
                      key={m.title}
                      title={m.title}
                      highlights={m.highlights}
                      index={j}
                    />
                  ))}
                </div>

                {i < CHAPTERS.length - 1 && (
                  <Reveal delay={0.1}>
                    <Separator className="mt-16" />
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* KPI grid + commit comparison — dashboard band */}
        <div
          id="metrics"
          className="mt-20 rounded-3xl border border-border/70 bg-gradient-to-b from-secondary/50 to-card/80 p-8 shadow-sm ring-1 ring-primary/6 md:p-10"
        >
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              By the numbers
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-2 text-3xl font-bold">Engineering Impact</h2>
          </Reveal>
          <KpiGrid cards={KPI_CARDS} />

          <CommitComparison
            rows={[...GITHUB_STATS.commitsByRepo]}
            myTotal={GITHUB_STATS.myCommits}
          />
        </div>
      </section>

      {/* ── Featured Work ────────────────────────────────────── */}
      <section
        id="featured-work"
        className="scroll-mt-20 border-t border-border bg-gradient-to-b from-chart-4/12 via-secondary/30 to-background py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Core features
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-2 text-3xl font-bold">Key Features Shipped</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Three of the standout features I contributed to across the Pebbles
              product.
            </p>
          </Reveal>

          <div className="mt-16 space-y-24">
            {FEATURES.map((feature, i) => (
              <div key={feature.id}>
                <FeatureCard feature={feature} index={i} />
                {i < FEATURES.length - 1 && (
                  <Reveal delay={0.1}>
                    <Separator className="mt-24" />
                  </Reveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Concerns ────────────────────────────────────────── */}
      <section
        id="concerns"
        className="scroll-mt-20 border-y border-border/60 bg-gradient-to-b from-muted/50 to-muted/25 py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Honest reflection
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-2 text-3xl font-bold">Concerns & Mitigations</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 text-muted-foreground">
              Things I am aware of and actively working to improve.
            </p>
          </Reveal>

          <div className="mt-10">
            <ConcernFlow concerns={CONCERNS} goals={GOALS} />
          </div>
        </div>
      </section>

      {/* ── What's next ─────────────────────────────────────── */}
      {/* <section
        id="whats-next"
        className="scroll-mt-20 border-t border-border/80 bg-gradient-to-b from-accent/35 via-background to-secondary/20 py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Looking ahead
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-2 text-3xl font-bold">Next steps — H2 2026</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Goals and areas I want to grow into over the second half of the year.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GOALS.map((g, i) => (
              <div
                key={g.number}
                id={`goal-${g.number}`}
                className="goal-anchor scroll-mt-28"
              >
                <GoalCard
                  number={g.number}
                  title={g.title}
                  bullets={g.bullets}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
