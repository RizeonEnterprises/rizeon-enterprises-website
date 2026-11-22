import {CaseIcon} from '@sanity/icons/Case'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {UserIcon} from '@sanity/icons/User'
import type {StructureResolver} from 'sanity/structure'

/**
 * Desk structure: groups the content editors touch most often at the top.
 * https://www.sanity.io/docs/studio/structure-builder-introduction
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('portfolioProject').title('Portfolio').icon(CaseIcon),
      S.documentTypeListItem('blogPost').title('Blog posts').icon(DocumentTextIcon),
      S.divider(),
      S.documentTypeListItem('author').title('Authors').icon(UserIcon),
    ])
