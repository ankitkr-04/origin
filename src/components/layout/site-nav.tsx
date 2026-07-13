"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronIcon,
  DownloadIcon,
  GithubIcon,
  ListIcon,
} from "@/components/icons";
import { BrandLogo } from "@/components/ui/brand-logo";

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
              <ChevronIcon
                width="12"
                height="12"
                className={`transition-transform duration-200 ${resumeMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resumeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-line/60 bg-void/90 p-2 shadow-xl backdrop-blur-md flex flex-col gap-1 z-50">
                <a
                  href="/api/resume/latest"
                  className="flex items-center gap-2 rounded px-3 py-2 font-mono text-xs tracking-wider text-polar transition-colors hover:bg-white/5"
                >
                  <DownloadIcon width="14" height="14" />
                  Download latest
                </a>
                <Link
                  href="/resume"
                  className="flex items-center gap-2 rounded px-3 py-2 font-mono text-xs tracking-wider text-mist transition-colors hover:bg-white/5 hover:text-polar"
                >
                  <ListIcon width="14" height="14" />
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
            <GithubIcon width="14" height="14" />
          </a>

          {/* Mobile Icon Buttons */}
          <a
            href="/api/resume/latest"
            aria-label="Download resume"
            className="flex size-11 items-center justify-center rounded-full border border-line text-polar transition-colors hover:border-ember hover:text-ember md:hidden"
          >
            <span className="sr-only">Download resume</span>
            <DownloadIcon width="16" height="16" />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex size-11 items-center justify-center rounded-full border border-line text-polar transition-colors hover:border-ember hover:text-ember md:hidden"
          >
            <span className="sr-only">GitHub profile</span>
            <GithubIcon width="18" height="18" />
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
              <ListIcon width="16" height="16" className="opacity-70" />
              Resume
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
