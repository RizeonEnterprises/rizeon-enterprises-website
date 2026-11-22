/**
 * Sanity environment for the Next.js app. Values come from `.env.local` (see `.env.example`).
 *
 * `NEXT_PUBLIC_*` variables must be referenced literally so Next.js can inline them.
 */

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

/**
 * Pins the Content Lake API behaviour. Bump deliberately, never to "today" automatically.
 * https://www.sanity.io/docs/content-lake/api-versioning
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-01'

function assertValue<T>(value: T | undefined, name: string): T {
  if (value === undefined || value === '') {
    throw new Error(
      `Missing environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    )
  }
  return value
}
