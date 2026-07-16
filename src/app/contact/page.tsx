// src/app/contact/page.tsx
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { StrataCanvas } from "@/components/scenes/strata-canvas";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getIdentity, getSocialLinks } from "@/db/identity";

export async function generateMetadata(): Promise<Metadata> {
  const identity = await getIdentity();
  return {
    title: "Contact",
    description: `Backend and systems engineering roles from May 2026 — ${identity.location}, working with anyone, anywhere.`,
  };
}

export default async function ContactPage() {
  const [identity, socialLinks] = await Promise.all([
    getIdentity(),
    getSocialLinks(),
  ]);

  return (
    <>
      <SiteNav githubUrl={identity.githubUrl} />
      <main className="relative flex min-h-svh flex-col pt-14">
        <div className="hero-glow absolute inset-0" aria-hidden />
        <div className="fixed inset-0 md:left-2/5" aria-hidden>
          <StrataCanvas />
        </div>
        <div
          className="absolute inset-0 bg-linear-to-b from-void via-void/58 to-void/30 md:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden bg-linear-to-r from-void via-void/68 to-transparent md:block"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-16 md:px-8">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-flame uppercase">
              001 / Contact <span className="text-faint">· θ CHANNEL OPEN</span>
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="type-cool mt-6 max-w-2xl text-4xl leading-[1.08] text-balance md:text-6xl">
              Based in {identity.location}. Building for{" "}
              <span className="type-molten">anywhere</span>.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-mist md:text-lg">
              Graduating May 2026, looking for backend and systems engineering
              roles. If your team cares about correctness and performance, I'd
              like to talk.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-start gap-7">
              <Button variant="ignite" href={`mailto:${identity.email}`}>
                {identity.email}
              </Button>
              <div className="font-mono text-xs leading-6 text-faint">
                <p>$ open connection --to ankit</p>
                <p>
                  → handshake: <span className="text-flame">warm</span>
                </p>
                <p>→ channel: open · latency: human</p>
              </div>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="melt font-mono text-xs"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div
          className="hero-ignite pointer-events-none absolute top-24 right-6 hidden flex-col items-end gap-1 text-right md:flex lg:right-14"
          style={{ animationDelay: "1.1s" }}
          aria-hidden
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-ice/70 uppercase">
            θ / thermal core
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            ice ⇄ ember
          </span>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
