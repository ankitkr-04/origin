import type { Metadata } from "next";
import { GlobeCanvas } from "@/components/contact/globe-canvas";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThermalButton } from "@/components/thermal/thermal-button";
import { identity, socialLinks } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Contact — Ankit Kumar",
  description:
    "Backend and systems engineering roles from May 2026 — Bhopal, India, working with anyone, anywhere.",
};

export default function ContactPage() {
  return (
    <>
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
          className="absolute inset-0 bg-gradient-to-b from-void via-void/40 to-void/80 md:bg-gradient-to-r md:from-void md:via-void/50 md:to-transparent"
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
              <ThermalButton variant="ignite" href={`mailto:${identity.email}`}>
                {identity.email}
              </ThermalButton>
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
      </main>
      <SiteFooter />
    </>
  );
}
