import { Suspense } from "react";

import { JsonLd } from "@/components/seo/json-ld";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HardwareShowcaseSection } from "@/components/sections/hardware-showcase-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyUsSection } from "@/components/sections/why-us-section";

export default function Home() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HardwareShowcaseSection />
      <WhyUsSection />
      <ProcessSection />
      {/*
        Selected Work pulls from Sanity. Wrapped in <Suspense> for Cache Components,
        and the section renders nothing until at least one project is published, so
        the homepage never shows an empty placeholder on day one.
      */}
      <Suspense fallback={null}>
        <SelectedWorkSection />
      </Suspense>
      <FaqSection />
      <ContactSection />
    </>
  );
}
