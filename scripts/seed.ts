/**
 * Idempotent content seed: upserts projects by slug, refreshes the small
 * profile tables. Run with `pnpm seed`.
 */
process.loadEnvFile(".env");

async function main() {
  const { db } = await import("@/db");
  const schema = await import("@/db/schema");
  const seed = await import("./seed-data");

  for (const [i, project] of seed.projects.entries()) {
    const { slug, demoUrl, ...rest } = project;
    const values = { slug, ...rest, demoUrl: demoUrl ?? null, sortOrder: i };
    const { slug: _slug, ...update } = values;
    await db
      .insert(schema.projects)
      .values(values)
      .onConflictDoUpdate({
        target: schema.projects.slug,
        set: { ...update, updatedAt: new Date() },
      });
  }

  await db.delete(schema.achievements);
  await db.insert(schema.achievements).values(
    seed.achievements.map((achievement, i) => ({
      ...achievement,
      sortOrder: i,
    })),
  );

  await db.delete(schema.experiences);
  await db.insert(schema.experiences).values(
    seed.experiences.map((experience, i) => ({
      ...experience,
      sortOrder: i,
    })),
  );

  await db.delete(schema.certifications);
  await db
    .insert(schema.certifications)
    .values(seed.certifications.map((title, i) => ({ title, sortOrder: i })));

  console.log(
    `Seeded ${seed.projects.length} projects, ${seed.achievements.length} achievements, ${seed.experiences.length} experiences, ${seed.certifications.length} certifications.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
