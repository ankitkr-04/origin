import Link from "next/link";
import { ProjectCase } from "@/components/projects/project-case";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/db/queries";

export async function FeaturedWork() {
  const flagshipProjects = (await getProjects()).filter(
    (project) => project.tier === "flagship",
  );

  return (
    <section id="work" className="scroll-mt-14 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="001"
          label="Selected work"
          title="Systems built from first principles"
        />

        <div>
          {flagshipProjects.map((project, i) => (
            <ProjectCase key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-14">
          <Link
            href="/projects"
            transitionTypes={["nav"]}
            className="inline-block rounded-full border border-line px-6 py-3 font-mono text-sm text-polar transition-colors hover:border-ember hover:text-ember"
          >
            All projects — including the early ones →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
