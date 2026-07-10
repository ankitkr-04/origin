import type { AchievementStat, SocialLink } from "@/types/content";

export const identity = {
  name: "Ankit Kumar",
  headline: "I build storage engines and the systems underneath them.",
  // Same sentence split for temperature typography: the middle segment is
  // the one molten phrase on the hero (engines run hot).
  headlineParts: [
    "I build ",
    "storage engines",
    " and the systems underneath them.",
  ],
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

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Lakshmi Narain College of Technology, Bhopal",
  period: "Aug 2023 — May 2026",
  cgpa: "8.41 / 10",
} as const;
