"use client";

interface Chapter {
  id: string;
  label: string;
}

export function ChapterTabs({ chapters }: { chapters: Chapter[] }) {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="sticky top-0 z-40 border-b border-primary/10 bg-background/85 shadow-sm shadow-primary/6 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-6 py-3">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => scrollTo(chapter.id)}
            className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {chapter.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
