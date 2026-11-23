import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Sanity image CDN (see sanity/image.ts).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Tailwind CSS is processed via PostCSS (postcss.config.mjs) so the same
  // pipeline works for both `next dev` (Turbopack) and `next build --webpack`
  // (required by Hostinger for Next.js 16.3.3+).
};

export default nextConfig;
