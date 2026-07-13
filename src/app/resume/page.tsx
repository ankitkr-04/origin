import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getIdentity } from "@/db/identity";
import { getResumes } from "@/db/resume";
import { ResumeNotifier } from "./resume-notifier";

export const metadata = {
  title: "Resumes — Ankit Kr",
  description: "Archive of previous resume versions and specialized focuses.",
};

export default async function ResumePage() {
  const [resumes, identity] = await Promise.all([getResumes(), getIdentity()]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav githubUrl={identity.githubUrl} />
      <main className="flex-1 pt-14 pb-24">
        <Suspense fallback={null}>
          <ResumeNotifier />
        </Suspense>

        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <SectionHeading
              index="001"
              label="Resume"
              title="Version History"
              readout="θ IMMUTABLE RECORD"
            />

            <div className="thermal-rail space-y-14 mt-12">
              {resumes.length === 0 ? (
                <div className="rounded-xl border border-line/50 p-12 text-center bg-abyss">
                  <p className="text-mist font-mono text-xs uppercase tracking-wider">
                    No resumes found
                  </p>
                </div>
              ) : (
                resumes.map((resume, idx) => (
                  <div
                    key={resume.id}
                    className="relative grid gap-6 md:grid-cols-[1.5fr_1fr]"
                  >
                    <span
                      className={`thermal-node ${
                        resume.isCurrent
                          ? "thermal-node-hot"
                          : "thermal-node-cold"
                      }`}
                      aria-hidden
                    />
                    <Reveal delay={idx * 50}>
                      <div>
                        <h3 className="font-display text-2xl font-bold flex flex-wrap items-center gap-3 text-polar">
                          {resume.label}
                          {resume.isCurrent && (
                            <span className="inline-flex items-center rounded-full bg-ember/10 px-2 py-0.5 text-[10px] font-mono tracking-widest text-ember uppercase ring-1 ring-inset ring-ember/20">
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-faint">
                          Updated{" "}
                          {new Date(resume.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>

                        {resume.focusAreas && resume.focusAreas.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
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
                      <div className="flex sm:justify-end items-start pt-4 sm:pt-0 border-t border-line/50 sm:border-0">
                        <Button variant="frost" href={resume.fileUrl}>
                          Download PDF
                        </Button>
                      </div>
                    </Reveal>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
