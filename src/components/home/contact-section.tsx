import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
            003 / Next
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="type-cool mx-auto mt-6 max-w-2xl text-4xl text-balance md:text-6xl">
            Let's build something that holds up{" "}
            <span className="type-molten">under load</span>.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <Button variant="ignite" href="/contact">
              Get in touch →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
