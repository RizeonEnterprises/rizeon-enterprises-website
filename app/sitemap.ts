import type { MetadataRoute } from "next";

import { getSitemapEntries } from "@/sanity/data";

const SITE_URL = "https://rizeonenterprises.com";

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
