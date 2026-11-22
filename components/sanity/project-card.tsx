import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";

import { urlFor } from "@/sanity/image";
import type { PORTFOLIO_PROJECTS_QUERY_RESULT } from "@/sanity/types";

type Project = PORTFOLIO_PROJECTS_QUERY_RESULT[number];

export function ProjectCard({ project }: { project: Project }) {
  const { title, slug, mainImage, challenge } = project;
  const imageUrl = mainImage?.asset
    ? urlFor(mainImage).width(800).height(500).fit("crop").url()
    : null;

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-transform duration-200 hover:-translate-y-1 hover:ring-foreground/20"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={mainImage.alt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <ImageIcon className="size-10" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-lg font-medium tracking-tight">{title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{challenge}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary">
          View case study
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
