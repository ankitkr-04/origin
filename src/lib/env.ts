/** Type-safe environment variables. */

interface Env {
  DATABASE_URL: string;
  GEMINI_API_KEY?: string;
  REVALIDATE_SECRET?: string;
  NEXT_PUBLIC_SITE_URL: string;
}

const getEnv = (): Env => {
  const isServer = typeof window === "undefined";

  const databaseUrl = process.env.DATABASE_URL;
  if (isServer && !databaseUrl) {
    // Only throw in server environments to prevent client-side build crashes
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
  };
};

export const env = getEnv();
