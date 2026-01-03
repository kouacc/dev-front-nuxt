<script setup lang="ts">
import type { SanityBook } from '~/types/cms/book'

const query = groq`*[_type == "book" && slug.current == $slug][0]{title, slug, publishedAt, cover, author->{ name }, body, categories[]->{ _key, title }}`

const { data: book, status } = await useLazySanityQuery<SanityBook>(query, useRoute().params)
if (status.value === 'error') {
  throw createError({ statusCode: 404, statusMessage: 'Book not found' })
} 
</script>

<template>
  <div v-if="book">
    <UITitle tag="h1">{{ book.title }}</UITitle>
    <NuxtImg v-if="book.cover" :src="useSanityImage(book.cover)?.url()" :alt="book?.title" />
    <SanityContent v-if="book.body" :value="book.body" />
  </div>
</template>