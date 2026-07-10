import { identity, socialLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-mono text-xs text-faint">
          © {new Date().getFullYear()} {identity.name} · {identity.location}
        </p>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted transition-colors hover:text-amber"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
