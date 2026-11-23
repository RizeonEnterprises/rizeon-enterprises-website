import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { getBuiltInPortfolioSlugs } from "@/lib/portfolio";
import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";

const SITE_URL = "https://rizeonenterprises.com";

/**
 * Fetch routable Sanity slugs with a short ("hours") cache instead of the
 * long-lived Sanity Live cache, so newly published projects/posts appear in the
 * sitemap on the Hostinger Node server within the hour (rather than a rebuild).
 */
async function getSitemapEntries() {
  "use cache";
  cacheLife("hours");
  return client.fetch(SITEMAP_QUERY);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();

  // Dedupe by URL so a Sanity project sharing a built-in slug isn't listed twice.
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (item: MetadataRoute.Sitemap[number]) => {
    if (!byUrl.has(item.url)) byUrl.set(item.url, item);
  };

  add({ url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 });
  add({ url: `${SITE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.8 });
  add({ url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 });

  // Curated built-in case studies (always present).
  for (const slug of getBuiltInPortfolioSlugs()) {
    add({ url: `${SITE_URL}/portfolio/${slug}`, changeFrequency: "monthly", priority: 0.7 });
  }

  // Published Sanity projects/posts.
  for (const entry of entries) {
    if (!entry.slug) continue;
    const url =
      entry._type === "blogPost"
        ? `${SITE_URL}/blog/${entry.slug}`
        : `${SITE_URL}/portfolio/${entry.slug}`;
    add({
      url,
      lastModified: entry._updatedAt ? new Date(entry._updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [...byUrl.values()];
}
