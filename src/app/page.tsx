import { HeroSection } from "@/components/hero/hero-section";
import { AchievementsSection } from "@/components/home/achievements-section";
import { ContactCta } from "@/components/home/contact-cta";
import { FeaturedWork } from "@/components/home/featured-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getIdentity } from "@/db/queries";

export default async function HomePage() {
  const identity = await getIdentity();

  return (
    <>
      <SiteNav githubUrl={identity.githubUrl} />
      <main>
        <HeroSection />
        <FeaturedWork />
        <AchievementsSection />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
