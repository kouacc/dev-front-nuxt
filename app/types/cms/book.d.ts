import type { SanityDocument } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

type SanityAuthor = SanityDocument & {
  name: string
  slug: string
}

type SanityCategory = SanityDocument & {
  name: string
  slug: string
}

type SanityBook = SanityDocument & {
  title: string
  slug: string
  cover: SanityImageSource
  publishedAt: string
  author: SanityAuthor
  categories: SanityCategory[]
}