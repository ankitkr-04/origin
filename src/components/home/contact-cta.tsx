import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function ContactCta() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-amber uppercase">
            003 / Next
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Let's build something that holds up under load.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10">
            <Link
              href="/contact"
              transitionTypes={["nav"]}
              className="inline-block rounded-full bg-amber px-8 py-4 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Get in touch →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
