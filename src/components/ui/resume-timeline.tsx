import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { resumes } from "@/db/schema";

export function ResumeTimeline({
  resumesList,
}: {
  resumesList: (typeof resumes.$inferSelect)[];
}) {
  if (resumesList.length === 0) {
    return (
      <div className="rounded-xl border border-line/50 p-12 text-center bg-abyss">
        <p className="text-mist font-mono text-xs uppercase tracking-wider">
          No archived resumes found
        </p>
      </div>
    );
  }

  return (
    <div className="relative border-l border-line/50 ml-4 md:ml-6 space-y-12 pb-12">
      {resumesList.map((resume, idx) => (
        <div key={resume.id} className="relative pl-8 md:pl-12 group">
          {/* Timeline Node */}
          <span
            className="absolute top-2 -left-[5px] w-[9px] h-[9px] rounded-full border border-line/50 bg-abyss group-hover:border-ice/50 group-hover:bg-ice/10 transition-colors duration-300"
            aria-hidden
          />

          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <Reveal delay={idx * 50}>
              <div>
                <p className="font-mono text-xs text-faint mb-2">
                  {new Date(resume.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                <h3 className="font-display text-2xl font-bold text-polar mb-3">
                  {resume.label}
                </h3>

                {resume.focusAreas && resume.focusAreas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {resume.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[11px] font-mono tracking-wide text-ice border border-line rounded px-2 py-0.5 bg-white/5"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={idx * 50 + 50}>
              <div className="flex sm:justify-end items-start pt-2">
                <Button variant="frost" href={resume.fileUrl}>
                  Download PDF
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      ))}
    </div>
  );
}
