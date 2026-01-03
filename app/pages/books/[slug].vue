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

      <div class="book-page__header">
        <div class="book-page__cover">
          <NuxtImg 
            v-if="book.cover" 
            :src="useSanityImage(book.cover)?.url()" 
            :alt="book?.title || 'Couverture du livre'" 
            width="400"
            height="600"
            fit="cover"
          />
          <div v-else class="book-page__cover-placeholder">
            <Icon name="lucide:book-open" size="80" />
          </div>
        </div>

        <div class="book-page__info">
          <UITitle tag="h1" class="book-page__title">{{ book.title }}</UITitle>
          
          <div v-if="book.author" class="book-page__author">
            <Icon name="lucide:user" size="20" />
            <span>{{ book.author.name }}</span>
          </div>

          <div v-if="book.publishedAt" class="book-page__date">
            <Icon name="lucide:calendar" size="20" />
            <span>Publié le {{ new Date(book.publishedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          </div>
      <div v-if="book.body" class="book-page__content wysiwyg">
        <SanityContent :value="book.body" />
      </div>

      <div class="book-page__actions">
        <UIButton as="link" href="/books">
          <Icon name="lucide:arrow-left" />
          Retour aux livres
        </UIButton>
      </div>
    </div>
  </div>
</template>
