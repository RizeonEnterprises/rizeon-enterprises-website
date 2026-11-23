import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { PortableTextBody } from "@/components/sanity/portable-text";
import { PortfolioImageFrame } from "@/components/sanity/portfolio-image-frame";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getBuiltInPortfolioSlugs, getPortfolioDetail } from "@/lib/portfolio";
import { urlFor } from "@/sanity/image";
import { cn } from "cn";

// Always ≥1 result (the curated built-in projects), so Cache Components is happy.
// These prerender statically; any extra Sanity-only slugs render on demand.
export function generateStaticParams() {
  return getBuiltInPortfolioSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioDetail(slug);
  if (!project) return { title: "Project not found" };

  let ogImage = "/logo.png";
  if (project.image.kind === "sanity") {
    ogImage = urlFor(project.image.image as Parameters<typeof urlFor>[0])
      .width(1200)
      .height(630)
      .fit("crop")
      .url();
  } else if (project.image.kind === "local") {
    ogImage = project.image.src;
  }

  return {
    title: project.title,
    description: project.challenge,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.challenge,
      url: `/portfolio/${project.slug}`,
      images: [{ url: ogImage }],
    },
  };
}

export default function PortfolioProjectPage(props: PageProps<"/portfolio/[slug]">) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectContent params={props.params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/portfolio/[slug]">["params"] }) {
  const { slug } = await params;
  const project = await getPortfolioDetail(slug);
  if (!project) notFound();

  const summary = [
    { label: "Challenge", value: project.challenge },
    { label: "Solution", value: project.solution },
    { label: "Result", value: project.result },
  ];

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to portfolio
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {project.category ? (
          <Badge variant="secondary" className="rounded-full text-xs">
            {project.category}
          </Badge>
        ) : null}
        {project.badge ? (
          <Badge variant="outline" className="rounded-full text-xs">
            {project.badge}
          </Badge>
        ) : null}
      </div>

      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {project.title}
      </h1>

      <div className="group mt-8 overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <PortfolioImageFrame
          image={project.image}
          title={project.title}
          category={project.category}
          liveUrl={project.liveUrl}
          large
          priority
        />
      </div>

      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "mt-5 gap-2 rounded-xl")}
        >
          Visit live site
          <ExternalLink className="size-4" aria-hidden />
        </a>
      ) : null}

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {summary.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1.5 rounded-xl bg-muted/40 p-5 ring-1 ring-foreground/10"
          >
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {label}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{value}</p>
          </div>
        ))}
      </div>

      {project.body ? (
        <div className="mt-10">
          <PortableTextBody value={project.body} />
        </div>
      ) : null}

      <div className="mt-12 flex flex-col items-start gap-3 rounded-xl border border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground sm:text-base">
          Want results like these for your business?
        </p>
        <Link href="/#contact" className={cn(buttonVariants(), "cta-ambient shrink-0 rounded-xl")}>
          Start your project
        </Link>
      </div>
    </article>
  );
}

function ProjectSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
      <div className="h-5 w-32 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-muted" />
      <div className="mt-8 aspect-[16/10] w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
