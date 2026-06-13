// Page d'accueil localisée
import { HeroSection } from "@/components/sections/landing/Hero";
import { AboutSection } from "@/components/sections/landing/About";
import { ProjectsSection } from "@/components/sections/landing/Projects";
import { NewsSection } from "@/components/sections/landing/News";
import { EventsSection } from "@/components/sections/landing/Events";
import { PartnersSection } from "@/components/sections/landing/Partners-fmt";
import { DonateSection } from "@/components/sections/landing/Donate";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <NewsSection />
      <EventsSection />
      <PartnersSection />
      <DonateSection />
    </main>
  );
}
