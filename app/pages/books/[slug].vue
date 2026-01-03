<script setup lang="ts">
import type { SanityBook } from '~/types/cms/book'

const query = groq`*[_type == "book" && slug.current == $slug][0]{title, slug, publishedAt, cover, author->{ name }, body, categories[]->{ _key, title }}`

const { data: book, status } = await useLazySanityQuery<SanityBook>(query, useRoute().params)
if (status.value === 'error') {
  throw createError({ statusCode: 404, statusMessage: 'Book not found' })
} 

const breadcrumbItems = computed(() => [
  { text: 'Accueil', href: '/' },
  { text: 'Livres', href: '/books' },
  { text: book.value?.title || 'Livre' }
])
</script>

<template>
  <div v-if="book" class="book-page">
    <div class="book-page__container">
      <UIBreadcrumb
        class="book-page__breadcrumb"
        :items="breadcrumbItems"
      />
    </div>
  </div>
</template>
