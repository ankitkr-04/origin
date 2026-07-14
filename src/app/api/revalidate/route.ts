import crypto from "node:crypto";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS, type CacheTag } from "@/lib/cache-config";

const validTags = new Set<string>(Object.values(CACHE_TAGS));

/**
 * Force-refresh cached content after editing the database:
 * curl -X POST -H "x-revalidate-secret: $REVALIDATE_SECRET" \
 *   "https://<site>/api/revalidate?tag=projects"
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!secret || !provided) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secretBuffer = Buffer.from(secret);
  const providedBuffer = Buffer.from(provided);

  if (
    secretBuffer.length !== providedBuffer.length ||
    !crypto.timingSafeEqual(secretBuffer, providedBuffer)
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tag = new URL(request.url).searchParams.get("tag");
  if (!tag || !validTags.has(tag)) {
    return Response.json(
      { error: `tag must be one of: ${[...validTags].join(", ")}` },
      { status: 400 },
    );
  }

  revalidateTag(tag as CacheTag, "max");
  return Response.json({ revalidated: tag });
}
