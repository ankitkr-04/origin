import { FeaturedWorkList } from "@/components/home/featured-work-list";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ThermalButton } from "@/components/thermal/thermal-button";
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

        <FeaturedWorkList flagshipProjects={flagshipProjects} />

        <Reveal className="mt-14">
          <ThermalButton variant="frost" href="/projects">
            All projects — including the early ones →
          </ThermalButton>
        </Reveal>
      </div>
    </section>
  );
}
