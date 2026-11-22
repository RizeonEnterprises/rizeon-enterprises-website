import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * Base Sanity client: published content only, served from the API CDN.
 *
 * Don't call `client.fetch` from pages directly. Use the functions in `./data.ts`
 * (built on `sanityFetch` in `./live.ts`) so results are cached and revalidate
 * automatically when content changes in the Studio.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
