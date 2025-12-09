import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export const useSanityImage = (source: SanityImageSource) => {
  const { projectId, dataset } = useSanity().client.config()

  return projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null
}
