// /app/[locale]/page.tsx

import { HeroSection } from "@/components/sections/landing/Hero";
import { AboutSection } from "@/components/sections/landing/About";
import { ProjectsSection } from "@/components/sections/landing/Projects";
import { NewsSection } from "@/components/sections/landing/News";
import { EventsSection } from "@/components/sections/landing/Events";
import { PastEventsSection } from "@/components/sections/landing/PastEvents";
import { PartnersSection } from "@/components/sections/landing/Partners-fmt";
import { DonateSection } from "@/components/sections/landing/Donate";
import { ContactSection } from "@/components/sections/landing/Contact";
import { FieldGallerySection } from "@/components/sections/landing/FieldGallery";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <NewsSection />
      <EventsSection />
      <PastEventsSection />
      <PartnersSection />
      <DonateSection />
      <ContactSection />
      <FieldGallerySection />
    </main>
  );
}
