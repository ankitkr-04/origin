import { Button } from "@/components/ui/button";
import type { resumes } from "@/db/schema";

export function FeaturedResume({
  resume,
}: {
  resume: typeof resumes.$inferSelect;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-ember/20 bg-abyss/80 p-8 md:p-12 shadow-[0_0_40px_rgba(255,100,50,0.1)] warm-card group mb-20"
      data-warm
    >
      <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        <span className="thermal-node thermal-node-hot" aria-hidden />
      </div>

      <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center rounded-full bg-ember/10 px-2.5 py-1 text-xs font-mono tracking-widest text-ember uppercase ring-1 ring-inset ring-ember/20">
              Current Focus
            </span>
            <p className="font-mono text-xs text-faint">
              Updated{" "}
              {new Date(resume.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-polar mb-6">
            {resume.label}
          </h2>
          {resume.focusAreas && resume.focusAreas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {resume.focusAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs font-mono tracking-wide text-ice border border-line rounded-md px-3 py-1.5 bg-white/5"
                >
                  {area}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex md:justify-end">
          <Button variant="ignite" href={resume.fileUrl}>
            Download PDF
          </Button>
        </div>
      </div>
    </section>
  );
}
