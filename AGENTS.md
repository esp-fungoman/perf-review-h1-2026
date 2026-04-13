## Learned User Preferences

- Use `yarn` as the package manager (not npm).
- Prefer light theme for the presentation site; avoid dark defaults.
- Be precise with wording about roles: the user was given a chance to act as a team leader but was not formally titled "team leader" — do not say "became the development team leader."
- For data that requires Jira (tickets, features released), use a placeholder `const` so the user can fill it in manually later; do not fabricate Jira data.
- For real contribution data, crawl from GitHub repositories; do not invent commit/PR counts.
- Wording corrections matter — update content when the user flags inaccurate descriptions of their role or contributions.
- Prefer replacing text-heavy sections with images/visual elements when the user flags too much text.
- For Work-related concerns and What's next, use short bullets on the card surface only (no long paragraphs or Read more dialogs on the review site).
- Prefer a modern, minimal look with intentional accent color and restrained motion; avoid a purely neutral grayscale presentation.

## Learned Workspace Facts

- This is a Next.js (App Router) + TypeScript presentation/portfolio site for a half-year performance review, targeting a tech lead and CEO audience.
- Stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, motion (framer-motion), lenis for smooth scroll.
- The main project featured is "Pebbles"; source data lives in sibling folders under `Perf Review/` (e.g. `pebbles-portal`, `pebbles-portal-lp`, `pebbles-lp`, `pebbles-analytics`, `pebbles-fe`, `pebbles-be`, `pebbles-admin`).
- Pebbles project icon assets can be found in `pebbles-fe` or `pebbles-lp`.
- User's Pebbles contributions include: acting as development team lead (task breakdown, member assignment by skill and timeline, doc/PR reviews), supporting other members' PRs, and direct commits/PRs.
- Jira ticket data (assigned/resolved) should be left as a const placeholder for the user to fill in after checking Jira directly.
- User's git author email across Pebbles repos is `phuongnamtran1902@gmail.com`; GitHub username is `esp-fungoman`; use these to filter commits and identify contributions.
- Three core/outstanding Pebbles features: **Booking Map** (Mapbox full-screen discovery with provider pins), **On Demand Service**, and **Vaccination Book**; these are the "Featured Work" section subjects.
- Presentation structure is theme-based (not time-based): 3 chapters — Discovery & planning, Team Management, Hands-on impact — plus Concerns and Goals/What's Next sections.
- Node.js runtime is v23.7.0; `ignore-engines true` is set in `.yarnrc` for yarn installs; base font size on `html` in `globals.css` is `18px` (above the browser default) so Tailwind rem-based sizes scale from that.
- Feature data model uses `images?: string[]` (2–3 screenshot paths per feature); feature cards show a tall framed main image with `object-cover` (fills the frame), optional prev/next chevrons when there are multiple shots, and a fullscreen dialog on click; screenshot files live in `public/pebbles/captures/`.
- Commit comparison (`CommitComparison`) uses GitHub-sourced numbers: headline shows animated commit count plus per-repo stacked bars; bar widths animate from zero when the block scrolls into view.