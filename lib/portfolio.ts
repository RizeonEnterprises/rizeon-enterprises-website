import "server-only";

import { getPortfolioProject, getPortfolioProjects } from "@/sanity/data";
import type {
  BlockContent,
  PORTFOLIO_PROJECT_QUERY_RESULT,
  PORTFOLIO_PROJECTS_QUERY_RESULT,
} from "@/sanity/types";
import { builtInProjects, type BuiltInProject } from "./portfolio-projects";

type SanityListProject = PORTFOLIO_PROJECTS_QUERY_RESULT[number];
type SanityDetailProject = NonNullable<PORTFOLIO_PROJECT_QUERY_RESULT>;

/** How a card/detail should render its image. */
export type PortfolioImage =
  | { kind: "sanity"; image: SanityListProject["mainImage"]; alt: string }
  | { kind: "local"; src: string; alt: string }
  | { kind: "mockup" };

export type PortfolioListItem = {
  slug: string;
  title: string;
  category: string | null;
  challenge: string;
  badge: string | null;
  liveUrl: string | null;
  image: PortfolioImage;
};

export type PortfolioDetail = PortfolioListItem & {
  solution: string;
  result: string;
  body: BlockContent | null;
};

function listFromSanity(p: SanityListProject): PortfolioListItem {
  return {
    slug: p.slug,
    title: p.title,
    category: null,
    challenge: p.challenge,
    badge: null,
    liveUrl: null,
    image: p.mainImage?.asset
      ? { kind: "sanity", image: p.mainImage, alt: p.mainImage.alt ?? p.title }
      : { kind: "mockup" },
  };
}

function listFromBuiltIn(p: BuiltInProject): PortfolioListItem {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    challenge: p.challenge,
    badge: p.badge ?? null,
    liveUrl: p.liveUrl ?? null,
    image: p.imageAvailable
      ? { kind: "local", src: p.image, alt: `${p.title} — project screenshot` }
      : { kind: "mockup" },
  };
}

function detailFromSanity(p: SanityDetailProject): PortfolioDetail {
  return {
    ...listFromSanity(p),
    solution: p.solution,
    result: p.result,
    body: p.body,
  };
}

function detailFromBuiltIn(p: BuiltInProject): PortfolioDetail {
  return { ...listFromBuiltIn(p), solution: p.solution, result: p.result, body: null };
}

/**
 * Merge the curated built-in projects with Sanity. A published Sanity project
 * with the same slug replaces the built-in in place; any extra Sanity projects
 * are appended. So the 5 flagship projects always show, and new CMS entries
 * appear automatically with no code changes.
 */
export async function getPortfolioList(): Promise<PortfolioListItem[]> {
  const sanity = await getPortfolioProjects();
  const sanityBySlug = new Map(sanity.map((p) => [p.slug, p]));
  const builtinSlugs = new Set(builtInProjects.map((p) => p.slug));

  const curated = builtInProjects.map((p) => {
    const match = sanityBySlug.get(p.slug);
    return match ? listFromSanity(match) : listFromBuiltIn(p);
  });
  const extras = sanity.filter((p) => !builtinSlugs.has(p.slug)).map(listFromSanity);

  return [...curated, ...extras];
}

export async function getPortfolioDetail(slug: string): Promise<PortfolioDetail | null> {
  const sanity = await getPortfolioProject(slug); // Sanity takes precedence
  if (sanity) return detailFromSanity(sanity);
  const builtin = builtInProjects.find((p) => p.slug === slug);
  return builtin ? detailFromBuiltIn(builtin) : null;
}

/** Slugs that are always prerenderable (the curated built-in projects). */
export function getBuiltInPortfolioSlugs(): string[] {
  return builtInProjects.map((p) => p.slug);
}
