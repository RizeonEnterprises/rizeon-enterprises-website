import { defineQuery } from "next-sanity";

/**
 * GROQ queries. Wrapped in `defineQuery` so Sanity TypeGen (`npm run typegen`) can
 * generate result types into `./types.ts`.
 */

// ─── Portfolio ────────────────────────────────────────────────────────────────

/** Cards for the portfolio index page. */
export const PORTFOLIO_PROJECTS_QUERY = defineQuery(`
  *[_type == "portfolioProject" && defined(slug.current)]
    | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      challenge,
      result
    }
`);

/** A single case study. */
export const PORTFOLIO_PROJECT_QUERY = defineQuery(`
  *[_type == "portfolioProject" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    mainImage,
    challenge,
    solution,
    result,
    body
  }
`);

/** For `generateStaticParams`. */
export const PORTFOLIO_PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "portfolioProject" && defined(slug.current)]{ "slug": slug.current }
`);

// ─── Blog ─────────────────────────────────────────────────────────────────────

/** Cards for the blog index page. */
export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      metaDescription,
      mainImage,
      "author": author->{ name, "slug": slug.current }
    }
`);

/** A single post, with everything needed for the page and its SEO metadata. */
export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    publishedAt,
    metaDescription,
    mainImage,
    body,
    "author": author->{ name, "slug": slug.current, role, image, bio }
  }
`);

/** For `generateStaticParams`. */
export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }
`);

// ─── SEO ──────────────────────────────────────────────────────────────────────

/** Every routable document, for `app/sitemap.ts`. */
export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["portfolioProject", "blogPost"] && defined(slug.current)] {
    _type,
    "slug": slug.current,
    _updatedAt
  }
`);
