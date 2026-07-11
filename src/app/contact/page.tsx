// src/app/contact/page.tsx
import type { Metadata } from "next";
import { BeaconCanvas } from "@/components/contact/beacon-canvas";
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
        <div className="hero-glow absolute inset-0" aria-hidden />
        <div className="absolute inset-0 md:left-2/5" aria-hidden>
          <BeaconCanvas />
        </div>
        {/* Same device-adaptive fade as the hero — vertical on mobile
            (content stacks over the full-bleed scene), horizontal on
            desktop (scene sits right, text reads over solid ground left) */}
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

        <div
          className="hero-ignite pointer-events-none absolute top-24 right-6 hidden flex-col items-end gap-1 text-right md:flex lg:right-14"
          style={{ animationDelay: "1.1s" }}
          aria-hidden
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-ice/70 uppercase">
            θ / beacon
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
