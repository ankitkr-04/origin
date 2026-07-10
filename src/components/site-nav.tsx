import { identity } from "@/lib/content";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Ankit Kumar — back to top"
        >
          AK<span className="text-amber">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={identity.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line px-4 py-1.5 font-mono text-xs tracking-wider text-text transition-colors hover:border-amber hover:text-amber"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
