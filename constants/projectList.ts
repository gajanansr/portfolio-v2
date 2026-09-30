import { FeaturedProject, Project } from "@/types/types";

// Order matters: the home page shows the first three.
export const featuredProjects: FeaturedProject[] = [
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
    projectUrl: "",
    gitHubUrl: "https://github.com/gajanansr/truecost",
    year: "2026",
    stack: ["Python", "Benchmarking", "LLM cost"],
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
    projectUrl: "https://claimo.fun",
    gitHubUrl: "https://github.com/gajanansr/claimo",
    year: "2026",
    stack: ["Next.js", "Supabase", "FastAPI", "Razorpay"],
  },
  {
    title: "launchreel",
    tagline: "Product in, launch video out",
    description:
      "Describe a product in plain language and get a launch video: a script grounded in real facts, rendered from Remotion templates, with sound design mixed in code. The MP4 is rendered in the visitor's own browser.",
    highlights: [
      "Streaming multi-stage LLM pipeline with schema repair loops",
      "In-browser rendering with @remotion/web-renderer, no render server",
      "Deployed on Cloudflare; a free model runs the whole pipeline",
    ],
    projectUrl: "https://launchreel.firstfoot.dev",
    gitHubUrl: "",
    note: "Private repo · live demo needs an invite code",
    year: "2026",
    stack: ["Remotion", "Next.js", "Cloudflare", "TypeScript"],
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
    projectUrl: "https://rewind-dsa.vercel.app/",
    gitHubUrl: "https://github.com/gajanansr/rewind",
    year: "2025",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL"],
  },
];

// Smaller or older work, shown as a compact list.
export const moreProjects: Project[] = [
  {
    title: "Event.io",
    description:
      "Team project I led: event and resource management with staff availability, internal messaging and JWT role-based auth.",
    gitHubUrl: "https://github.com/gajanansr/event.io",
    year: "2025",
    stack: ["Spring Boot", "Angular", "MySQL"],
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
  {
    title: "KindWars",
    description:
      "Arcade game where playtime is meant to fund cancer charities through ad revenue. Installable PWA.",
    projectUrl: "https://kindwars.vercel.app",
    gitHubUrl: "https://github.com/gajanansr/kindwars",
    year: "2025",
    stack: ["React", "Phaser 3", "TypeScript"],
  },
  {
    title: "Is This Startup Stupid?",
    description:
      "A late-night infomercial that scores your startup idea on how stupid it is versus how fundable it is anyway.",
    gitHubUrl: "https://github.com/gajanansr/is-this-startup-stupid",
    year: "2026",
    stack: ["Node.js", "Vanilla JS"],
  },
  {
    title: "EasyCode",
    description:
      "Simplifies competitive-programming problem statements for people learning DSA.",
    gitHubUrl: "https://github.com/gajanansr/easycode",
    year: "2024",
    stack: ["Next.js", "MongoDB", "ShadCN"],
  },
];
