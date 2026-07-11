import { env } from "./env";

export const siteConfig = {
  name: "Ankit Kumar",
  title: "Ankit Kumar — Systems & Backend Engineer",
  description:
    "Storage engines, Redis-compatible servers, and high-concurrency backends. TCS CodeVita global rank 15, Codeforces Expert. B.Tech CSE, class of 2026.",
  keywords: [
    "systems engineer",
    "backend engineer",
    "storage engine",
    "C++",
    "Java",
    "concurrency",
  ],
  url: env.NEXT_PUBLIC_SITE_URL,
  github: "https://github.com/ankitkr-04",
  linkedin: "https://linkedin.com/in/ankitkr04",
  twitter: "@AnkitKr_04",
  email: "ak0182274@gmail.com",
} as const;
