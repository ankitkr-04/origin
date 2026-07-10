import { ContactSection } from "@/components/contact/contact-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { HeroSection } from "@/components/hero/hero-section";
import { ProofSection } from "@/components/proof/proof-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WorkSection } from "@/components/work/work-section";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <ProofSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
