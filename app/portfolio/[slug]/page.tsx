import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

import { PortableTextBody } from "@/components/sanity/portable-text";
import { buttonVariants } from "@/components/ui/button";
import { getPortfolioProject } from "@/sanity/data";
import { urlFor } from "@/sanity/image";
import { cn } from "cn";

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  if (!project) return { title: "Project not found" };

  const ogImage = project.mainImage?.asset
    ? urlFor(project.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: project.title,
    description: project.challenge,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.challenge,
      url: `/portfolio/${project.slug}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default function PortfolioProjectPage(props: PageProps<"/portfolio/[slug]">) {
  // Dynamic data lives behind <Suspense> so Cache Components renders a static
  // shell and the route works on day one with zero published projects.
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectContent params={props.params} />
    </Suspense>
  );
}

async function ProjectContent({
  params,
}: {
  params: PageProps<"/portfolio/[slug]">["params"];
}) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  if (!project) notFound();

  const imageUrl = project.mainImage?.asset
    ? urlFor(project.mainImage).width(1600).height(900).fit("crop").url()
    : null;

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

      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {project.title}
      </h1>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.mainImage.alt ?? project.title}
          width={1600}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="mt-8 h-auto w-full rounded-xl ring-1 ring-foreground/10"
        />
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
      <div className="mt-8 aspect-video w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
