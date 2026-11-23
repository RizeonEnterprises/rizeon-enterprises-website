import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { PortfolioListItem } from "@/lib/portfolio";
import { PortfolioImageFrame } from "./portfolio-image-frame";

export function ProjectCard({ project }: { project: PortfolioListItem }) {
  const { slug, title, category, challenge, badge, liveUrl, image } = project;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-transform duration-200 hover:-translate-y-1 hover:ring-foreground/20">
      <Link href={`/portfolio/${slug}`} aria-label={`${title} — view case study`}>
        <PortfolioImageFrame image={image} title={title} category={category} liveUrl={liveUrl} />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {category ? (
            <Badge variant="secondary" className="rounded-full text-[11px]">
              {category}
            </Badge>
          ) : null}
          {badge ? (
            <Badge variant="outline" className="rounded-full text-[11px]">
              {badge}
            </Badge>
          ) : null}
        </div>

        <h3 className="font-heading text-lg leading-snug font-medium tracking-tight">
          <Link href={`/portfolio/${slug}`} className="transition-colors hover:text-primary">
            {title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{challenge}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3">
          <Link
            href={`/portfolio/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Visit live site
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
