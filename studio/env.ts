/**
 * Studio environment.
 *
 * Sanity exposes any `SANITY_STUDIO_*` variable from `studio/.env` to the Studio bundle.
 * Each variable must be referenced literally (`process.env.SANITY_STUDIO_X`) so the
 * bundler can inline it at build time.
 */

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'SANITY_STUDIO_PROJECT_ID',
)

export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Keep in sync with NEXT_PUBLIC_SANITY_API_VERSION in the Next.js app.
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2026-11-01'

function assertValue<T>(value: T | undefined, name: string): T {
  if (value === undefined || value === '') {
    throw new Error(
      `Missing environment variable: ${name}. Copy studio/.env.example to studio/.env and fill it in.`,
    )
  }
  return value
}
