/** Type-safe environment variables. */

interface Env {
  DATABASE_URL: string;
  GEMINI_API_KEY?: string;
  REVALIDATE_SECRET?: string;
  NEXT_PUBLIC_SITE_URL: string;
  GITHUB_PERSONAL_ACCESS_TOKEN? : string;
}

const getEnv = (): Env => {
  const isServer = typeof window === "undefined";

  const databaseUrl = process.env.DATABASE_URL;
  if (isServer && !databaseUrl) {
    throw new Error(
      "Missing required server environment variable: DATABASE_URL",
    );
  }

  return {
    DATABASE_URL: databaseUrl || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, 
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "https://ankitkr.dev",
    GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  };
};

export const env = getEnv();
