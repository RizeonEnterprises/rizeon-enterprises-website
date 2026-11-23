import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase } from "lucide-react";

import { ProjectCard } from "@/components/sanity/project-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getPortfolioList } from "@/lib/portfolio";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies in custom software, modern websites, and e-commerce stores Rizeon Enterprises has delivered for clients across India and worldwide.",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioList();

  return (
    <section className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
      <header className="flex max-w-2xl flex-col gap-4">
        <Badge
          variant="secondary"
          className="w-fit rounded-full px-3 py-1 text-xs font-medium tracking-wide"
        >
          Portfolio
        </Badge>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Our Work
        </h1>
        <p className="text-lg text-pretty text-muted-foreground">
          A selection of the software, websites, and online stores we&rsquo;ve built and shipped—for
          clients across India and worldwide.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <Briefcase className="size-6" aria-hidden />
          </span>
          <h2 className="font-heading text-xl font-medium tracking-tight">
            Case studies coming soon
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            We&rsquo;re putting our latest projects together. In the meantime, tell us what
            you&rsquo;re building and we&rsquo;ll share the most relevant work from our desk.
          </p>
          <Link href="/#contact" className={cn(buttonVariants(), "mt-2 rounded-xl")}>
            Start a project
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
