/**
 * Pebbles project contribution data for the half-year review.
 *
 * GitHub-derived stats are computed from local git history (Aug 2025 – Apr 2026).
 * Jira and released-feature counts are placeholder constants — replace them after
 * verifying your Jira board.
 *
 * CONCERNS and GOALS: use `bullets` for the card surface (2–3 scannable lines each).
 */

// ---------------------------------------------------------------------------
// GitHub-derived (real numbers from git log)
// ---------------------------------------------------------------------------

export const GITHUB_STATS = {
  /** My commits across all pebbles-* repos (from GitHub contributor graphs) */
  myCommits: 536,
  /** Total commits across all pebbles-* repos (all authors, from GitHub) */
  totalCommits: 1364,
  /** My share as a percentage */
  sharePercent: 39,

  /** Per-repo breakdown — mine vs total (from GitHub contributor graphs) */
  commitsByRepo: [
    { repo: "pebbles-fe", mine: 171, total: 348 },
    { repo: "pebbles-be", mine: 150, total: 387 },
    { repo: "pebbles-admin", mine: 84, total: 167 },
    { repo: "pebbles-lp", mine: 61, total: 163 },
    { repo: "pebbles-portal", mine: 41, total: 187 },
    { repo: "pebbles-portal-lp", mine: 21, total: 104 },
    { repo: "pebbles-analytics", mine: 8, total: 8 },
  ],

  reposContributedTo: 7,
  from: "Augober 2025",
  to: "April 2026",
} as const;

// ---------------------------------------------------------------------------
// Jira (placeholder — replace after checking your Jira board)
// ---------------------------------------------------------------------------

export const JIRA_STATS = {
  ticketsHandled: 265, // total visible with assignee filter across all sprints + backlog
  ticketsTotal: 620, // total unfiltered across same sprints + backlog
  sharePercent: 43, // Math.round(265 / 620 * 100)
};

// ---------------------------------------------------------------------------
// Released features
// ---------------------------------------------------------------------------

export const RELEASE_STATS = {
  featuresReleased: 12,
  domains: 3,
  landingPages: 2,
};

// ---------------------------------------------------------------------------
// KPI cards shown in the Achievements section
// ---------------------------------------------------------------------------

export const KPI_CARDS = [
  {
    label: "Commits",
    value: String(GITHUB_STATS.myCommits),
    sub: "",
  },
  {
    label: "Jira Tickets",
    value: String(JIRA_STATS.ticketsHandled),
    sub: "",
  },
  {
    label: "Features Released",
    value: String(RELEASE_STATS.featuresReleased),
    sub: "",
  },
] as const;

// ---------------------------------------------------------------------------
// Chapters — theme-based (3 responsibilities, not 3 time periods)
// ---------------------------------------------------------------------------

export type Milestone = {
  title: string;
  detail: string;
  highlights: string[];
  evidence?: string;
};

export type Chapter = {
  id: string;
  label: string;
  title: string;
  period: string;
  description: string;
  milestones: Milestone[];
};

export const CHAPTERS: Chapter[] = [
  // ── Chapter 1: Discovery & planning (pre-build) ─────────────────────────────
  {
    id: "chapter-1",
    label: "Discovery & planning",
    title: "Shaping work before build",
    period: "Ongoing · Full 6 months",
    description:
      "Working alongside anh Tùng, I led technical discovery on incoming specs before development started: walking through PO docs and design together, turning that into concrete FE/BE tasks and estimates, surfacing risks or blockers early to the PM, and giving QC a clear signal once a feature was ready to exercise on QC — so the team could start with alignment instead of thrashing on unclear scope.",
    milestones: [
      {
        title: "Scoping from docs & design",
        detail:
          "For each new feature, I worked through the PO documentation and design files to pin down scope, edge cases, and dependencies before anyone wrote code — building a shared picture of the user flow and how we would know the feature was complete.",
        highlights: [
          "Cross-referencing docs and design to catch gaps early",
          "Calling out unclear requirements and asking clarifying questions",
          "Understanding the full flow before splitting work into tasks",
        ],
        evidence: "Ongoing · Aug 2025 – Apr 2026",
      },
      {
        title: "Work breakdown & estimates",
        detail:
          "Once scope was clear, I broke the feature into concrete dev tasks with estimates, and flagged back to the PM when timelines or risk didn’t match the plan — so expectations stayed honest before sprint commitment.",
        highlights: [
          "Splitting work into FE, BE, and integration tasks",
          "Sizing effort against team capacity",
          "Raising delivery risk to the PM before it turned into a blocker",
        ],
      },
      {
        title: "QC handoff & release readiness",
        detail:
          "When a feature was stable on QC, I coordinated the handoff to QC: what to test, what was in or out of scope, and when to expect it on the QC environment — then followed feedback back to the right developer.",
        highlights: [
          "Confirming readiness before asking QC to test",
          "Giving QC scope context and known edge cases",
          // "Routing QC feedback to the right owner quickly",
        ],
      },
    ],
  },

  // ── Chapter 2: Team Management ────────────────────────────────────────────
  {
    id: "chapter-2",
    label: "Team Management",
    title: "Managing a 5-Person Dev Team",
    period: "First time managing at this scale",
    description:
      "This was the first time I managed a dev team of 5 people, each with a different skill profile — some fullstack, some FE-only, some BE-only. The challenge was allocating tasks in a way that played to each person's strengths while keeping delivery on track against a timeline already committed to the client.",
    milestones: [
      {
        title: "Task Allocation by Skill",
        detail:
          "With a mixed-skill team, task assignment wasn't straightforward. I had to understand each member's strengths and assign work that matched their stack while making sure no one was blocked waiting for another.",
        highlights: [
          "Matching FE tasks to FE-focused members, BE tasks to BE-focused members",
          "Giving fullstack members the tasks that bridged both sides",
          "Avoiding bottlenecks by sequencing dependencies carefully",
        ],
      },
      {
        title: "Timeline & Ticket Tracking",
        detail:
          "With everything planned against client commitments, I had to track ticket status and deadlines more closely than I had before — catching slippage early and adjusting before it became a problem.",
        highlights: [
          "Daily awareness of each member's ticket status",
          "Identifying delays early and re-allocating when needed",
          "Keeping the plan aligned with client expectations",
        ],
      },
      {
        title: "Resource Optimisation",
        detail:
          "Beyond just assigning tasks, I tried to optimise the team's overall throughput — making sure no one was idle and that parallel workstreams didn't create merge or integration conflicts.",
        highlights: [
          "Coordinating FE and BE work on the same feature to avoid integration delays",
          "Adjusting scope within a sprint when capacity was unexpectedly reduced",
          "Balancing delivery speed with code quality across the team",
        ],
      },
    ],
  },

  // ── Chapter 3: Hands-on impact ─────────────────────────────────────────────
  {
    id: "chapter-3",
    label: "Hands-on impact",
    title: "Owning the hardest work and the messy edges",
    period: "Youngest member, largest responsibility",
    description:
      "Being the youngest member on the team but trusted with lead responsibilities made me feel a strong sense of accountability. I intentionally took on the hardest tasks when distributing work, and actively picked up bug fixes to build a deeper understanding of the full project — not just my own slice of it.",
    milestones: [
      {
        title: "Taking the Hardest Tasks",
        detail:
          "When breaking down features, I tried to keep the most complex or ambiguous tasks for myself — partly to protect the team from getting stuck, and partly to grow faster through the harder problems.",
        highlights: [
          "Volunteering for tasks with unclear requirements or tricky integration",
          "Taking on BE and FE tasks when the team was at capacity",
          "Using difficult tasks as a way to deepen my own understanding",
        ],
      },
      {
        title: "Bug Fix Ownership",
        detail:
          "I took on more bug fixes than my share — not just to keep things moving, but because fixing bugs across the codebase is one of the fastest ways to understand how a project actually works in production.",
        highlights: [
          "Proactively picking up bug tickets from the backlog",
          "Tracing issues across FE, BE, and admin layers",
          "Building familiarity with parts of the project outside my assigned features",
        ],
        evidence: "203 commits across 7 repos · Aug 2025 – Apr 2026",
      },
      {
        title: "PR Reviews & Unblocking Teammates",
        detail:
          "Alongside my own work, I reviewed teammates' pull requests — catching edge cases, suggesting improvements, and helping move PRs across the line so delivery didn't slow down waiting for review.",
        highlights: [
          "Code reviews on FE, BE, and admin pull requests",
          "Unblocking teammates stuck on conflict resolution or integration issues",
          "Providing constructive feedback without slowing down the review cycle",
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Work-related concerns
// Fill in from your script — keep each concern honest but constructive.
// ---------------------------------------------------------------------------

export type Concern = {
  title: string;
  bullets: readonly string[];
  planRef: string;
};

export const CONCERNS: Concern[] = [
  {
    title: "How to prove leadership capability?",
    planRef: "01",
    bullets: [
      "Youngest on the team while taking on lead responsibilities — real pressure to perform.",
      "Juggling alignment, clear communication, and not becoming a bottleneck.",
      "Still calibrating what strong leadership looks like in practice, day to day.",
    ],
  },
  {
    title: "No clear benchmark to grow toward",
    planRef: "02",
    bullets: [
      "No internal picture yet of what counts as a strong SWE vs a strong lead here.",
      "Hard to prioritise gaps — depth, process, or people — without a shared rubric.",
      // "Clearer expectations from leadership would help me aim effort on purpose, not by guessing.",
    ],
  },
  {
    title: "The LLM Fallacy: shipping code I can't fully defend",
    planRef: "04",
    bullets: [
      "I prompt AI, it codes — I commit it. I felt like I owned it, but did I really?",
      "The real risk: everyone feels they understand the codebase, until it breaks and nobody can fix it.",
      "My rule: I only ship what I can explain and defend — with or without AI available.",
    ],
  },
];

// ---------------------------------------------------------------------------
// What's next — goals for H2 2026
// Fill in from your script.
// ---------------------------------------------------------------------------

export type Goal = {
  number: string; // "01", "02", …
  title: string;
  bullets: readonly string[];
};

export const GOALS: Goal[] = [
  {
    number: "01",
    title: "Take ownership of the lead role officially",
    bullets: [
      // "Leave this review with a clear answer: is the lead scope mine to grow into, or does it stay informal?",
      "Prove leadership through shipped quality — track P0/P1 bugs per feature.",
      "Not just owning individual tasks, but structuring feature delivery, aligning priorities, and ensuring dependencies are sequenced before sprint start.",
    ],
  },
  {
    number: "02",
    title: "Get a clear growth benchmark from leadership",
    bullets: [
      "Use this review to align on what the company needs from this role — not just what I want to grow into.",
      "Combine with roadmap planning to set clear goals and measure progress.",
      // "Get a concrete picture of what 'strong lead' looks like here, then map my gaps honestly against it.",
      // "Agree a 6-month check-in with leadership to measure whether my direction matches what the team needs.",
    ],
  },
  // {
  //   number: "03",
  //   title: "Sharpen time management and estimation",
  //   bullets: [
  //     "Time-block the calendar to protect deep-work windows.",
  //     "Cap active tickets to reduce context switching.",
  //     "Compare sprint estimates vs actuals and tighten planning over time.",
  //   ],
  // },
  {
    number: "03",
    title: "Build deeper technical foundations alongside AI usage",
    bullets: [
      "Rule: I only ship what I can explain — no hand-waving AI output.",
      "Reserve sprint time for unassisted deep dives in the codebase.",
      "Use AI to accelerate, not to skip understanding the system.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Featured work — 3 core Pebbles features
// ---------------------------------------------------------------------------

export type Feature = {
  id: string;
  title: string;
  tagline: string; // one short sentence shown under the title
  description: string; // 2-3 sentences of detail
  users: string; // who uses this feature
  tags: string[]; // tech/concept badge chips
  images?: string[]; // 1–3 local paths under public/, e.g. "/captures/booking-map-1.png"
};

export const FEATURES: Feature[] = [
  {
    id: "booking-map",
    title: "Booking Map",
    tagline: "Find and book service providers on a live map.",
    description:
      "A full-screen Mapbox experience where consumers discover verified providers via interactive pins. The map updates as the user pans (Search this area), supports real-time filters for category, distance, rating, price, and time, and includes a saved-places mode. Selecting a provider opens a bottom sheet with details and a direct booking entry point.",
    users: "End users · Consumer app",
    tags: ["Mapbox GL", "TanStack Query", "Zustand", "Bounding-box search"],
    images: [
      "/pebbles/captures/booking-1.jpg",
      "/pebbles/captures/booking-2.jpg",
    ],
  },
  {
    id: "on-demand-booking",
    title: "On-Demand Service Booking",
    tagline: "Browse a service menu and book a timeslot instantly.",
    description:
      "For on-demand providers, users see a service menu grouped by category, select a service, and pick from server-generated 30-minute timeslots with capacity and buffer-time checks. The multi-step flow — services → timeslot → details → checkout → confirmation — is entirely separate from the scheduled/class booking path.",
    users: "End users · Consumer app",
    tags: [
      "Multi-step booking flow",
      "Timeslot generation",
      "Zustand",
      "BullMQ capacity",
    ],
    images: [
      "/pebbles/captures/service-1.jpg",
      "/pebbles/captures/service-2.jpg",
      "/pebbles/captures/service-3.jpg",
    ],
  },
  {
    id: "vaccination-book",
    title: "Vaccination Book",
    tagline: "Track a child's immunisation schedule in one place.",
    description:
      "A parent-facing immunisation tracker that shows a disease-group × dose matrix (upcoming, overdue, completed) for each child profile. Parents log actual dose dates, pick vaccine products, and the backend auto-generates subsequent dose records via a BullMQ queue using vaccine-schedule intervals. Combo-vaccine blocking prevents duplicate disease-group coverage.",
    users: "Parents · Consumer app",
    tags: ["Child profiles", "BullMQ queue", "TanStack Query", "Formik + Yup"],
    images: [
      "/pebbles/captures/vaccine-1.jpg",
      "/pebbles/captures/vaccine-2.png",
    ],
  },
];

// ---------------------------------------------------------------------------
// Project intro block
// ---------------------------------------------------------------------------

export const PEBBLES_PROJECT = {
  name: "Pebbles",
  logoPath: "/pebbles/logo.svg",
  logoFullPath: "/pebbles/logo_full.svg",
  role: "Developer · Growing into a delivery-coordination role",
  scope: "FE · BE · Admin · Analytics · Landing Pages",
  period: "Aug 2025 – Apr 2026",
  summary:
    "Pebbles is a platform providing consumer health and lifestyle services. Over six months I contributed across the full product surface. From bootstrapping core systems to shipping key features and supporting team delivery.",
} as const;
