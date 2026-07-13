"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav({ githubUrl }: { githubUrl: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);

  // Close menus on navigation.
  useEffect(() => {
    if (pathname) {
      setMenuOpen(false);
      setResumeMenuOpen(false);
    }
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-void/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <Link
          href="/"
          transitionTypes={["nav"]}
          className="flex items-center gap-2.5"
          aria-label="Ankit Kumar — home"
        >
          <BrandLogo />
          <span className="type-frozen text-[13px] tracking-[0.16em] leading-none hidden sm:inline translate-y-px">
            ANKIT KR
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              transitionTypes={["nav"]}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:text-polar ${
                isActive(link.href) ? "text-flame" : "text-mist"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* biome-ignore lint/a11y/noStaticElementInteractions: Used to detect click outside dropdown via onBlur */}
          <div
            className="relative hidden md:block outline-none"
            tabIndex={-1}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setResumeMenuOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={resumeMenuOpen}
              onClick={() => setResumeMenuOpen((open) => !open)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-xs tracking-wider transition-colors ${
                resumeMenuOpen || isActive("/resume")
                  ? "border-ember text-ember"
                  : "border-line text-polar hover:border-ember hover:text-ember"
              }`}
            >
              Resume
              <svg
                aria-hidden="true"
                role="img"
                aria-label="Chevron"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${resumeMenuOpen ? "rotate-180" : ""}`}
              >
                <title>Chevron</title>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {resumeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-line/60 bg-void/90 p-2 shadow-xl backdrop-blur-md flex flex-col gap-1 z-50">
                <a
                  href="/api/resume/latest"
                  className="flex items-center gap-2 rounded px-3 py-2 font-mono text-xs tracking-wider text-polar transition-colors hover:bg-white/5"
                >
                  <svg
                    aria-hidden="true"
                    role="img"
                    aria-label="Download"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>Download</title>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download latest
                </a>
                <Link
                  href="/resume"
                  className="flex items-center gap-2 rounded px-3 py-2 font-mono text-xs tracking-wider text-mist transition-colors hover:bg-white/5 hover:text-polar"
                >
                  <svg
                    aria-hidden="true"
                    role="img"
                    aria-label="List"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>List</title>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  View all versions
                </Link>
              </div>
            )}
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-xs tracking-wider text-polar transition-colors hover:border-ember hover:text-ember md:flex"
          >
            GitHub
            <svg
              aria-hidden="true"
              role="img"
              aria-label="GitHub"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>GitHub</title>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Mobile Icon Buttons */}
          <a
            href="/api/resume/latest"
            aria-label="Download resume"
            className="flex size-11 items-center justify-center rounded-full border border-line text-polar transition-colors hover:border-ember hover:text-ember md:hidden"
          >
            <span className="sr-only">Download resume</span>
            <svg
              aria-hidden="true"
              role="img"
              aria-label="Download"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Download</title>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex size-11 items-center justify-center rounded-full border border-line text-polar transition-colors hover:border-ember hover:text-ember md:hidden"
          >
            <span className="sr-only">GitHub profile</span>
            <svg
              aria-hidden="true"
              role="img"
              aria-label="GitHub"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>GitHub</title>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
          >
            <span
              className={`h-px w-4 bg-polar transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-polar transition-transform ${menuOpen ? "translate-y-[-3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-line/60 md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                transitionTypes={["nav"]}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded px-2 py-3 font-mono text-sm tracking-[0.2em] uppercase ${
                  isActive(link.href) ? "text-flame" : "text-mist"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resume"
              transitionTypes={["nav"]}
              aria-current={isActive("/resume") ? "page" : undefined}
              className={`flex items-center gap-2 rounded px-2 py-3 font-mono text-sm tracking-[0.2em] uppercase ${
                isActive("/resume") ? "text-flame" : "text-mist"
              }`}
            >
              <svg
                aria-hidden="true"
                role="img"
                aria-label="List"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              >
                <title>List</title>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Resume
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
