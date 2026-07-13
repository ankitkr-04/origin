import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { FeaturedResume } from "@/components/ui/featured-resume";
import { ResumeTimeline } from "@/components/ui/resume-timeline";
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

  const currentResume = resumes.find((r) => r.isCurrent);
  const archivedResumes = resumes.filter((r) => !r.isCurrent);

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

            <div className="mt-12">
              {currentResume && <FeaturedResume resume={currentResume} />}
              <ResumeTimeline resumesList={archivedResumes} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
