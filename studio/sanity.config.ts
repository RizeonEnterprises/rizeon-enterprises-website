import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {apiVersion, dataset, projectId} from './env'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Rizeon Enterprises',

  projectId,
  dataset,

  plugins: [structureTool({structure}), visionTool({defaultApiVersion: apiVersion})],

  schema: {
    types: schemaTypes,
  },
})
