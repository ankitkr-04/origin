import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  /** Numbered doc-style index, e.g. "001" — mirrors the architecture-doc convention. */
  index: string;
  label: string;
  title: string;
}

export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
          {index} / {label}
        </span>
        <div className="rule-fade flex-1" />
      </div>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
