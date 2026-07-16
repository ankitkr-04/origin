import { CurrentYear } from "@/components/ui/current-year";
import { getIdentity, getSocialLinks } from "@/db/identity";

export async function SiteFooter() {
  // Cache component: lets the © year render at build/revalidate time,
  // which cacheComponents forbids in plain server components.
  "use cache";

  const identity = await getIdentity();
  const socialLinks = await getSocialLinks();

  return (
    <footer className="relative z-10 border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-mono text-xs text-faint">
          © <CurrentYear fallback={2026} /> {identity.name} ·{" "}
          {identity.location}
        </p>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-mist transition-colors hover:text-ember"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
