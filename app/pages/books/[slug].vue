<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

const query = groq`*[_type == "book" && slug.current == $slug][0]`

const { data: book } = await useLazySanityQuery<SanityDocument>(query, useRoute().params)

const { projectId, dataset } = useSanity().client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null

/* if (!book.value) {
  throw createError({ statusCode: 404, statusMessage: 'Book not found' })
}  */
</script>

<template>
  <div v-if="book">
    <pre>{{ book }}</pre>
    <NuxtImg v-if="book.cover" :src="urlFor(book.cover).url()" :alt="book?.title" />
  </div>
</template>