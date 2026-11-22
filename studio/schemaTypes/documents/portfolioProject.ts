import {CaseIcon} from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

import {imageWithAlt} from '../fields/imageWithAlt'

export const portfolioProject = defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'caseStudy', title: 'Case study'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      description: 'Used in the URL: /work/<slug>',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    imageWithAlt({group: 'overview'}),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
      group: 'caseStudy',
      description: 'The problem the client came to us with.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 4,
      group: 'caseStudy',
      description: 'What we built or changed to solve it.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'text',
      rows: 4,
      group: 'caseStudy',
      description: 'The measurable outcome (e.g. "+38% qualified leads in 90 days").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'caseStudy',
      description: 'The full case study write-up.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'mainImage',
    },
    prepare({title, slug, media}) {
      return {title, subtitle: slug ? `/work/${slug}` : 'No slug yet', media}
    },
  },
})
