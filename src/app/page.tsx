import { AchievementsSection } from "@/components/home/achievements-section";
import { ContactSection } from "@/components/home/contact-section";
import { FeaturedWorkSection } from "@/components/home/featured-work-section";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { getIdentity } from "@/db/identity";

export default async function HomePage() {
  const identity = await getIdentity();

  return (
    <>
      <SiteNav githubUrl={identity.githubUrl} />
      <main>
        <HeroSection />
        <FeaturedWorkSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
