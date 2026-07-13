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

  await db.delete(schema.identity);
  await db.insert(schema.identity).values({
    name: seed.identity.name,
    headline: seed.identity.headline,
    headlineParts: seed.identity.headlineParts,
    positioning: seed.identity.positioning,
    location: seed.identity.location,
    email: seed.identity.email,
    githubUrl: seed.identity.githubUrl,
    aboutNarrative: seed.identity.aboutNarrative,
  });

  await db.delete(schema.socialLinks);
  await db.insert(schema.socialLinks).values(
    seed.socialLinks.map((link, i) => ({
      label: link.label,
      href: link.href,
      sortOrder: i,
    })),
  );

  await db.delete(schema.achievementStats);
  await db.insert(schema.achievementStats).values(
    seed.achievementStats.map((stat, i) => ({
      value: stat.value,
      label: stat.label,
      detail: stat.detail,
      sortOrder: i,
    })),
  );

  await db.delete(schema.educations);
  await db.insert(schema.educations).values({
    degree: seed.education.degree,
    institution: seed.education.institution,
    period: seed.education.period,
    cgpa: seed.education.cgpa,
    sortOrder: 0,
  });

  await db.delete(schema.resumes);
  await db.insert(schema.resumes).values(
    seed.resumes.map((resume) => ({
      label: resume.label,
      fileUrl: resume.fileUrl,
      focusAreas: resume.focusAreas,
      isCurrent: resume.isCurrent,
      updatedAt: resume.updatedAt,
    })),
  );

  console.log(
    `Seeded ${seed.projects.length} projects, ${seed.achievements.length} achievements, ${seed.experiences.length} experiences, ${seed.certifications.length} certifications, identity, ${seed.socialLinks.length} social links, ${seed.achievementStats.length} achievement stats, education, and ${seed.resumes.length} resumes.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
