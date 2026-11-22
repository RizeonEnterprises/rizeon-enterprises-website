import {defineCliConfig} from 'sanity/cli'

// Read env directly (no throwing helper) so commands like `sanity login` still work
// before studio/.env has been filled in.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {projectId, dataset},
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  /**
   * Sanity TypeGen: reads the GROQ queries in the Next.js app (`../sanity`) and writes
   * their result types to `../sanity/types.ts`. Run `npm run typegen` after changing a
   * schema or a query.
   */
  typegen: {
    path: '../sanity/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../sanity/types.ts',
    overloadClientMethods: true,
  },
})
