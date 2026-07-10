import type {
  Achievement,
  AchievementStat,
  Experience,
  SocialLink,
} from "@/types/content";

export const identity = {
  name: "Ankit Kumar",
  headline: "I build storage engines and the systems underneath them.",
  positioning:
    "Final-year CS student and Codeforces Expert focused on backend and systems engineering — high-throughput servers, storage internals, and infrastructure with measured performance.",
  location: "Bhopal, India",
  education: "B.Tech CSE · LNCT Bhopal · Class of 2026",
  email: "ak0182274@gmail.com",
  githubUrl: "https://github.com/ankitkr-04",
} as const;

export const aboutNarrative = [
  "I'm a final-year computer science student who got curious about what actually happens under an API — and kept digging until I hit allocators. The projects that followed run the whole depth of the stack: a C++26 storage engine that starts at NUMA-aware memory management, a Redis-compatible server built on a single event loop, and a booking platform whose architecture was written as ten numbered documents before the first commit.",
  "The throughline is measured performance. Claims on this site come with the benchmark, the bound, or the sanitizer run that backs them — and where something is still in progress, it says so.",
  "Away from the terminal: competitive programming (Codeforces Expert) and chess.",
] as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/ankitkr-04" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ankitkr04" },
  { label: "X / Twitter", href: "https://x.com/AnkitKr_04" },
];

export const achievementStats: AchievementStat[] = [
  {
    value: "#15",
    label: "TCS CodeVita S13, global",
    detail: "of 669,000+ participants",
  },
  {
    value: "1655",
    label: "Codeforces Expert",
    detail: "externally verifiable rating",
  },
  {
    value: "OCI",
    label: "Oracle Cloud certified",
    detail: "2025 Developer Professional",
  },
  {
    value: "8.41",
    label: "CGPA / 10",
    detail: "B.Tech CSE, class of 2026",
  },
];

export const achievements: Achievement[] = [
  {
    value: "Global Rank 15",
    context: "TCS CodeVita Season 13 — out of 669,000+ participants worldwide",
    note: "Top 0.003% in one of the world's largest coding competitions",
  },
  {
    value: "Expert · 1655",
    context: "Codeforces competitive rating",
    note: "Externally verifiable, earned across rated contests",
  },
];

export const certifications = [
  "Oracle Cloud Infrastructure 2025 Developer Professional (1Z0-1084-25)",
  "AWS Academy — Cloud Foundations",
];

export const experience: Experience = {
  company: "ControlShift Talent",
  role: "Engineering Intern",
  period: "Feb — May 2025",
  summary:
    "Built the real-time backbone of a live AI interviewing platform — the infrastructure between a candidate on video and the AI on the other end.",
  highlights: [
    "Architected WebRTC signaling and a WebSocket layer with heartbeat, room management, and reconnection for candidate–AI video sessions",
    "Built a collaborative code editor over WebSocket, syncing client state live during interviews",
    "Moved blocking email I/O to BullMQ + Redis job queues with retry and dead-letter handling",
    "Chunked live interview recordings into an async cheat-detection AI pipeline",
    "Shipped 30+ REST endpoints with input validation and centralized error handling, backed by 25+ unit tests on auth and booking paths",
  ],
};

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Lakshmi Narain College of Technology, Bhopal",
  period: "Aug 2023 — May 2026",
  cgpa: "8.41 / 10",
} as const;
