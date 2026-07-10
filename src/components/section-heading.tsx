import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  /** Numbered doc-style index, e.g. "001" — mirrors the architecture-doc convention. */
  index: string;
  label: string;
  title: string;
  /** Optional θ temperature readout shown at the end of the eyebrow row. */
  readout?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  readout,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
          {index} / {label}
        </span>
        <div className="rule-fade flex-1" />
        {readout ? (
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
            {readout}
          </span>
        ) : null}
      </div>
      <h2 className="type-frozen mt-5 text-2xl text-balance md:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
