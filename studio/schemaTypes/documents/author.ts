import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

import {imageWithAlt} from '../fields/imageWithAlt'

/**
 * Referenced by `blogPost.author`. A separate document (rather than a plain string)
 * so one author can be reused across posts and given a bio for E-E-A-T signals.
 */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Head of Growth"',
    }),
    imageWithAlt({name: 'image', title: 'Photo', required: false}),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'image'},
  },
})
