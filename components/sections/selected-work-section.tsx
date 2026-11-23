import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/sanity/project-card";
import { buttonVariants } from "@/components/ui/button";
import { getPortfolioList } from "@/lib/portfolio";
import { cn } from "cn";
import { Section, SectionHeading } from "./section";

/**
 * Homepage CMS preview. Async RSC (wrapped in <Suspense> on the page). Returns
 * null when no projects are published, so the homepage shows no empty box on
 * day one and fills in automatically once work is published in the Studio.
 */
export async function SelectedWorkSection() {
  const projects = await getPortfolioList();
  if (projects.length === 0) return null;

  const featured = projects.slice(0, 3);

  return (
    <Section id="work" className="scroll-mt-24 bg-muted/30">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <SectionHeading
          align="start"
          eyebrow="Selected Work"
          title="Recent projects we're proud of"
          description="A look at the software, websites, and stores we've shipped for clients."
        />
        <Link
          href="/portfolio"
          className={cn(buttonVariants({ variant: "outline" }), "shrink-0 gap-2 rounded-xl")}
        >
          View all work
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
