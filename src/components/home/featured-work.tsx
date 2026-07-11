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
    <section
      id="work"
      className="relative scroll-mt-14 py-20 md:py-28 overflow-hidden"
    >
      {/* Background LSM-Tree compaction schematic */}
      <div
        className="absolute -right-16 top-1/4 -z-10 w-96 h-96 opacity-15 pointer-events-none hidden lg:block select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="w-full h-full text-ice/40"
          stroke="currentColor"
        >
          <title>LSM-Tree Compaction Flowchart</title>
          <rect
            x="20"
            y="20"
            width="60"
            height="30"
            rx="3"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <text
            x="50"
            y="38"
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            MemTable (RAM)
          </text>

          <path
            d="M80 35 L120 35"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2,2"
          />
          <polygon points="120,35 117,33 117,37" fill="currentColor" />
          <text
            x="100"
            y="31"
            fontSize="5"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            Flush (L0)
          </text>

          <rect x="120" y="20" width="60" height="30" rx="3" strokeWidth="1" />
          <text
            x="150"
            y="38"
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            L0 SSTables
          </text>

          <path d="M150 50 L150 90" strokeWidth="1" strokeLinecap="round" />
          <polygon points="150,90 148,87 152,87" fill="currentColor" />
          <text
            x="162"
            y="73"
            fontSize="5"
            fontFamily="monospace"
            textAnchor="start"
            fill="currentColor"
          >
            Compaction
          </text>

          <rect x="120" y="90" width="60" height="30" rx="3" strokeWidth="1" />
          <text
            x="150"
            y="108"
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            L1 SSTables
          </text>

          <circle cx="50" cy="120" r="10" strokeWidth="1" />
          <circle cx="35" cy="145" r="8" strokeWidth="1" />
          <circle cx="65" cy="145" r="8" strokeWidth="1" />
          <line x1="45" y1="128" x2="38" y2="138" strokeWidth="1" />
          <line x1="55" y1="128" x2="62" y2="138" strokeWidth="1" />
          <text
            x="50"
            y="122"
            fontSize="5"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            B+ Tree
          </text>
          <text
            x="35"
            y="147"
            fontSize="4"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            L
          </text>
          <text
            x="65"
            y="147"
            fontSize="4"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            R
          </text>

          <path d="M90 105 H120" strokeWidth="1" strokeDasharray="3,3" />
          <text
            x="105"
            y="101"
            fontSize="4"
            fontFamily="monospace"
            textAnchor="middle"
            fill="currentColor"
          >
            Index pointer
          </text>
        </svg>
      </div>

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
