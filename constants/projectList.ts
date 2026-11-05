import { FeaturedProject, Project } from "@/types/types";

// Ordered strongest first: real users and revenue, then technical depth.
export const featuredProjects: FeaturedProject[] = [
  {
    title: "LaunchReel",
    tagline: "A Claude Code plugin that makes your launch video",
    description:
      "Claude reads your repo, inspects the running app and builds every scene as code with Remotion. It also edits talking-head recordings. You review in a local Studio, pin a comment on any frame, and Claude fixes just that spot.",
    highlights: [
      "81 installs and 3 paying customers",
      "MCP server published to npm; billing and licence API on Cloudflare Workers + D1",
      "Schema-validated harness: every on-screen number must trace to a fact you supplied",
    ],
    image: "/assets/projects/launchreel.jpg",
    projectUrl: "https://launchreel.tech",
    gitHubUrl: "https://github.com/gajanansr/launchreel-plugin",
    note: "Plugin repo is public · app code is private",
    year: "2026",
    stack: ["Remotion", "MCP", "Next.js", "Cloudflare", "TypeScript"],
  },
  {
    title: "Slates",
    tagline: "One workspace for you and your agents",
    description:
      "An installable PWA where agents like Claude, ChatGPT and Grok create and update typed boards over MCP or REST. You read them on your phone, tick things off, set reminders and watch changes land live.",
    highlights: [
      "MCP server with OAuth 2.1 (PKCE, dynamic client registration), usable as a custom connector",
      "One write path: a SECURITY DEFINER function plus row-level security on every table",
      "Hashed, scoped, revocable agent tokens and optimistic concurrency for parallel agents",
    ],
    image: "/assets/projects/slates.jpg",
    projectUrl: "https://www.slates.space",
    note: "Invite-only · private repo",
    year: "2026",
    stack: ["Next.js", "Supabase", "MCP", "TypeScript"],
  },
  {
    title: "Claimo",
    tagline: "Ride receipts in, reimbursement-ready PDF out",
    description:
      "Connects to the Gmail inbox behind your Uber or Rapido account, parses receipts into a private database, and renders a monthly expense report with the receipts attached. Live with 24+ paying users at ₹149/month and 40+ reports generated in its first two months.",
    highlights: [
      "24+ paying users at ₹149/month (~₹3.5K MRR)",
      "Read-only Gmail sync with duplicate protection by message and ride ID",
      "Separate Python service renders PDFs with WeasyPrint and Chromium",
      "Razorpay subscriptions, Supabase auth and storage",
    ],
    image: "/assets/projects/claimo.jpg",
    projectUrl: "https://claimo.fun",
    gitHubUrl: "https://github.com/gajanansr/claimo",
    year: "2026",
    stack: ["Next.js", "Supabase", "FastAPI", "Razorpay"],
  },
  {
    title: "truecost",
    tagline: "A cache-aware audit of LLM token-savings claims",
    description:
      "I built ContextMesh, a context layer for Claude Code, then measured it. Injected context turns cheap prompt-cache reads into expensive writes, so the tool cost more than it saved. I archived it and turned the benchmark harness into truecost.",
    highlights: [
      "Injected blocks were billed at 6.4x to 23.2x their own size",
      "Every result links to the raw JSON it came from",
      "Publishes the negative result on my own tool first",
    ],
    image: "/assets/projects/truecost.jpg",
    projectUrl: "",
    gitHubUrl: "https://github.com/gajanansr/truecost",
    year: "2026",
    stack: ["Python", "Benchmarking", "LLM cost"],
  },
  {
    title: "Rewind",
    tagline: "Interview prep built on retention, not streaks",
    description:
      "Record yourself thinking aloud through a DSA solution, get AI feedback on the explanation, and revisit problems on a pattern-based spaced-repetition schedule.",
    highlights: [
      "Spring Boot and PostgreSQL backend, React PWA frontend",
      "Think-aloud audio capture with AI feedback",
      "Schedules by pattern mastery instead of by problem",
    ],
    image: "/assets/projects/rewind.jpg",
    projectUrl: "https://rewind-dsa.vercel.app/",
    gitHubUrl: "https://github.com/gajanansr/rewind",
    year: "2025",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL"],
  },
  {
    title: "Quire",
    tagline: "An Android reader with no INTERNET permission",
    description:
      "Reads EPUB, PDF and TXT. No account, no sync, no analytics. Privacy here is enforced by the OS, because the app can't reach the network at all.",
    highlights: [
      "PDFs are reflowed into real paragraphs so type size and themes work",
      "Typeset like a book: justified, hyphenated, widows and orphans handled",
      "Five themes including a strictly greyscale E-ink mode, checked by a test",
    ],
    image: "/assets/projects/quire.jpg",
    projectUrl: "https://gajanansr.github.io/quire/",
    gitHubUrl: "https://github.com/gajanansr/quire",
    year: "2026",
    stack: ["Kotlin", "Android", "GitHub Actions"],
  },
];

// Games get their own section, strongest first.
export const games: FeaturedProject[] = [
  {
    title: "Tanda",
    tagline: "A cinematic farming game set in a real Banjara village",
    description:
      "Come home to Ukhali Tanda, a village in Jalna. Plough black soil, sell at the mandi, take a moneylender's loan, stand in the panchayat election. It runs in the browser with no install and no sign-up.",
    highlights: [
      "Roads and lanes come from OpenStreetMap; field strips are laid out from satellite imagery",
      "Seasonal mandi prices, a land market, loans and a 14-day ledger",
      "11 story missions where your choices change prices and reputation",
    ],
    image: "/assets/projects/tanda.jpg",
    projectUrl: "https://tanda.gajananrathod.in",
    gitHubUrl: "https://github.com/gajanansr/tanda-an-village",
    year: "2026",
    stack: ["Three.js", "TypeScript", "Supabase", "Vercel"],
  },
  {
    title: "RAM Heist",
    tagline: "Hide your RAM from the boss for five nights",
    description:
      "A parody stealth game that runs in the browser. Hide RAM chips around a server room, upload them at the terminal to build the People's Cluster, and fight back with decoy mugs, coffee traps and breakers. Playable on desktop and phone.",
    highlights: [
      "Five escalating nights with flickering lights, blackouts and a hunting AI that listens for noise",
      "Upgrade shop, an endless mode, voiced lines, sound effects and music",
      "Touch controls, auto-landscape and a compact HUD on mobile",
    ],
    image: "/assets/projects/ram-heist.jpg",
    projectUrl: "https://ram.gajananrathod.in",
    gitHubUrl: "https://github.com/gajanansr/ram-heist",
    note: "All dialogue is fictional · not affiliated with any real person or company",
    year: "2026",
    stack: ["Three.js", "JavaScript", "Vite", "Web Audio"],
  },
  {
    title: "KindWars",
    tagline: "Arcade game that turns enemies into friends",
    description:
      "Shoot kindness orbs at falling enemies to turn them into friends. Playtime is meant to fund cancer charities through ad revenue. Installable PWA.",
    highlights: [
      "Non-violent arcade loop: nobody is destroyed, everyone is befriended",
      "Installable PWA built with Phaser 3 and React",
    ],
    image: "/assets/projects/kindwars.jpg",
    projectUrl: "https://kindwars.vercel.app",
    gitHubUrl: "https://github.com/gajanansr/kindwars",
    year: "2025",
    stack: ["React", "Phaser 3", "TypeScript"],
  },
];

// Smaller work, shown as a compact list. Tutorial-sized and joke projects are left out on purpose.
export const moreProjects: Project[] = [
  {
    title: "claude-worklog",
    description:
      "A Claude Code plugin that keeps a daily work log with strict status words and ends replies with short interview notes after real engineering work.",
    gitHubUrl: "https://github.com/gajanansr/claude-worklog",
    year: "2026",
    stack: ["Claude Code", "Hooks", "Skills"],
  },
  {
    title: "Loopin",
    description:
      "Real-time chat for gated, subscription-based communities. Razorpay subscriptions, single-device login, WebSockets.",
    gitHubUrl: "https://github.com/gajanansr/loopin-spring",
    year: "2025",
    stack: ["Spring Boot", "PostgreSQL", "Redis", "React Native"],
  },
  {
    title: "AutoMix",
    description:
      "Turns raw phone-recorded vocals into a mixed, mastered song in the browser.",
    projectUrl: "https://automix-audio.vercel.app/",
    gitHubUrl: "https://github.com/gajanansr/audioEngine",
    year: "2025",
    stack: ["React", "Web Audio API", "Supabase"],
  },
];
