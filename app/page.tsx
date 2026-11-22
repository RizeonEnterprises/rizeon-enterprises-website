import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
    </main>
  );
}
