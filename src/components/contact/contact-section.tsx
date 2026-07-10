import { Reveal } from "@/components/reveal";
import { identity, socialLinks } from "@/lib/content";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-14 border-t border-line/60 bg-surface/40 py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-amber uppercase">
            004 / Contact
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Let's build something that holds up under load.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            Graduating May 2026, looking for backend and systems engineering
            roles. If your team cares about correctness and performance, I'd
            like to talk.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <a
              href={`mailto:${identity.email}`}
              className="rounded-full bg-amber px-8 py-4 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {identity.email}
            </a>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted transition-colors hover:text-amber"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
