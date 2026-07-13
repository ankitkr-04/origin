import { FeaturedWorkList } from "@/components/home/featured-work-list";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjects } from "@/db/projects";

export async function FeaturedWorkSection() {
  const flagshipProjects = (await getProjects()).filter(
    (project) => project.tier === "flagship",
  );

  return (
    <section
      id="work"
      className="relative scroll-mt-14 py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="001"
          label="Selected work"
          title="Systems built from first principles"
        />

        <FeaturedWorkList flagshipProjects={flagshipProjects} />

        <Reveal className="mt-14">
          <Button variant="frost" href="/projects">
            All projects — including the early ones →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
