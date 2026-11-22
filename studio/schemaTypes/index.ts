import {author} from './documents/author'
import {blogPost} from './documents/blogPost'
import {portfolioProject} from './documents/portfolioProject'
import {blockContent} from './objects/blockContent'

export const schemaTypes = [
  // Documents
  portfolioProject,
  blogPost,
  author,
  // Objects
  blockContent,
]
