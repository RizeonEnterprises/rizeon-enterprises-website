import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";

const SITE_URL = "https://rizeonenterprises.com";

/**
 * Fetch routable slugs with a short ("hours") cache instead of the long-lived
 * Sanity Live cache, so newly published projects/posts appear in the sitemap on
 * the Hostinger Node server within the hour (rather than needing a rebuild).
 */
async function getSitemapEntries() {
  "use cache";
  cacheLife("hours");
  return client.fetch(SITEMAP_QUERY);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = entries
    .filter((entry) => entry.slug)
    .map((entry) => ({
      url:
        entry._type === "blogPost"
          ? `${SITE_URL}/blog/${entry.slug}`
          : `${SITE_URL}/portfolio/${entry.slug}`,
      lastModified: entry._updatedAt ? new Date(entry._updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...dynamicRoutes];
}
