import { cachedSanityFetch } from "./live";
import {
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
  PORTFOLIO_PROJECT_QUERY,
  PORTFOLIO_PROJECT_SLUGS_QUERY,
  PORTFOLIO_PROJECTS_QUERY,
  SITEMAP_QUERY,
} from "./queries";

/**
 * Data access for pages. Each function returns published content, cached and
 * auto-revalidated by Sanity Live. Return types come from Sanity TypeGen.
 *
 * `stega: false` keeps strings clean. Switch to the draft-aware options from
 * `next-sanity/live` when adding Draft Mode / Visual Editing later.
 */
const published = { perspective: "published", stega: false } as const;

// ─── Portfolio ────────────────────────────────────────────────────────────────

export async function getPortfolioProjects() {
  const { data } = await cachedSanityFetch({
    query: PORTFOLIO_PROJECTS_QUERY,
    ...published,
  });
  return data;
}

export async function getPortfolioProject(slug: string) {
  const { data } = await cachedSanityFetch({
    query: PORTFOLIO_PROJECT_QUERY,
    params: { slug },
    ...published,
  });
  return data;
}

export async function getPortfolioProjectSlugs() {
  const { data } = await cachedSanityFetch({
    query: PORTFOLIO_PROJECT_SLUGS_QUERY,
    ...published,
  });
  return data;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts() {
  const { data } = await cachedSanityFetch({
    query: BLOG_POSTS_QUERY,
    ...published,
  });
  return data;
}

export async function getBlogPost(slug: string) {
  const { data } = await cachedSanityFetch({
    query: BLOG_POST_QUERY,
    params: { slug },
    ...published,
  });
  return data;
}

export async function getBlogPostSlugs() {
  const { data } = await cachedSanityFetch({
    query: BLOG_POST_SLUGS_QUERY,
    ...published,
  });
  return data;
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function getSitemapEntries() {
  const { data } = await cachedSanityFetch({
    query: SITEMAP_QUERY,
    ...published,
  });
  return data;
}
