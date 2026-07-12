import { env } from "./env";

export const siteConfig = {
  keywords: [
    "systems engineer",
    "backend engineer",
    "storage engine",
    "C++",
    "Java",
    "concurrency",
  ],
  url: env.NEXT_PUBLIC_SITE_URL,
} as const;
