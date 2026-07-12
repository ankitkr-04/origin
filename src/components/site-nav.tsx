"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { identity } from "@/lib/profile";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => {
    if (pathname) setMenuOpen(false);
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
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-4 py-1.5 font-mono text-xs tracking-wider text-polar transition-colors hover:border-ember hover:text-ember"
          >
            GitHub ↗
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
          >
            <span
              className={`h-px w-4 bg-polar transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-polar transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
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
          </div>
        </div>
      ) : null}
    </header>
  );
}
