import {defineField} from 'sanity'

interface ImageWithAltOptions {
  name?: string
  title?: string
  description?: string
  required?: boolean
  group?: string
}

/**
 * An image field with hotspot/crop and an `alt` text sub-field.
 * Alt text is required whenever an image is set (accessibility + image SEO).
 */
export function imageWithAlt({
  name = 'mainImage',
  title = 'Main image',
  description,
  required = true,
  group,
}: ImageWithAltOptions = {}) {
  return defineField({
    name,
    title,
    description,
    group,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        description: 'Describe the image for screen readers and search engines.',
        validation: (rule) =>
          rule.custom((alt, context) => {
            const image = context.parent as {asset?: unknown} | undefined
            return image?.asset && !alt ? 'Alt text is required when an image is set.' : true
          }),
      }),
    ],
    validation: (rule) => (required ? rule.required() : rule),
  })
}
