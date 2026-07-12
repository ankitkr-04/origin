import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { identity, socialLinks } from "@/db/schema";
import { CACHE_TAGS, CONTENT_CACHE_LIFE } from "@/lib/cache-config";

export async function getIdentity(): Promise<
  import("@/types/content").Identity
> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const [row] = await db.select().from(identity).limit(1);
  return {
    name: row.name,
    headline: row.headline,
    headlineParts: row.headlineParts,
    positioning: row.positioning,
    location: row.location,
    email: row.email,
    githubUrl: row.githubUrl,
    aboutNarrative: row.aboutNarrative,
  };
}

export async function getSocialLinks(): Promise<
  import("@/types/content").SocialLink[]
> {
  "use cache";
  cacheTag(CACHE_TAGS.profile);
  cacheLife(CONTENT_CACHE_LIFE);
  const rows = await db
    .select()
    .from(socialLinks)
    .orderBy(asc(socialLinks.sortOrder));
  return rows.map((row) => ({
    label: row.label,
    href: row.href,
  }));
}
