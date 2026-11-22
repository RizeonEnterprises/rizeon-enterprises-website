import "server-only";

import { defineLive, type StrictDefinedFetchType } from "next-sanity/live";

import { client } from "./client";

/**
 * Only needed if the dataset is private. Never expose it to the browser.
 * Create a "Viewer" token at https://www.sanity.io/manage → API → Tokens.
 */
const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Sanity Live (Live Content API) wired up for Next.js Cache Components.
 *
 * - `sanityFetch` tags every result with Sanity sync tags (`cacheTag`) and caches it
 *   for a long time (`cacheLife`).
 * - `<SanityLive />` (mounted in `app/layout.tsx`) listens for content changes and
 *   revalidates exactly the affected tags, so a publish in the Studio shows up on the
 *   site within seconds without a rebuild or webhook.
 *
 * `strict: true` makes `perspective` and `stega` explicit at every call site, which is
 * what Cache Components need (dynamic values like `draftMode()` must be read outside
 * `'use cache'` boundaries).
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token || false,
  browserToken: false,
  strict: true,
});

/**
 * The app's single `'use cache'` boundary for Sanity data. `sanityFetch` calls
 * `cacheTag`/`cacheLife` itself but does not create the boundary, so every fetch
 * goes through this wrapper.
 */
export const cachedSanityFetch: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};
