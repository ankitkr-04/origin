import type { Metadata } from "next";
import { GlobeCanvas } from "@/components/contact/globe-canvas";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { identity, socialLinks } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Contact — Ankit Kumar",
  description:
    "Backend and systems engineering roles from May 2026 — Bhopal, India, working with anyone, anywhere.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <SiteNav />
      <main className="relative flex min-h-svh flex-col overflow-hidden pt-14">
        {/* Globe behind/beside the content */}
        <div
          className="absolute inset-x-0 bottom-[-20%] top-1/3 md:inset-y-0 md:left-2/5"
          aria-hidden
        >
          <GlobeCanvas />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink/80 md:bg-gradient-to-r md:from-ink md:via-ink/50 md:to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-16 md:px-8">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-amber uppercase">
              001 / Contact
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
              Based in {identity.location}. Building for anywhere.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-muted md:text-lg">
              Graduating May 2026, looking for backend and systems engineering
              roles. If your team cares about correctness and performance, I'd
              like to talk.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-start gap-6">
              <a
                href={`mailto:${identity.email}`}
                className="rounded-full bg-amber px-8 py-4 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                {identity.email}
              </a>
              <div className="flex flex-wrap gap-6">
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
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
