import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

import {imageWithAlt} from '../fields/imageWithAlt'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: ['content', 'seo'],
      description: 'Also used as the page <title>. Aim for under 60 characters.',
      validation: (rule) => [
        rule.required(),
        rule.max(60).warning('Titles over 60 characters are usually truncated in search results.'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: ['content', 'seo'],
      description: 'Used in the URL: /blog/<slug>',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    imageWithAlt({group: 'content'}),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Shown under the title in search results and link previews. 120–160 characters.',
      validation: (rule) => [
        rule.required(),
        rule.min(70).warning('Short descriptions leave room unused in search results.'),
        rule.max(160).warning('Descriptions over 160 characters are usually truncated.'),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare({title, author, publishedAt, media}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unscheduled'
      return {title, subtitle: [date, author && `by ${author}`].filter(Boolean).join(' · '), media}
    },
  },
})
