<script setup lang="ts">
import type { Book } from '~/types/sanity.types'

type BookWithCategories = Omit<Book, 'categories'> & { categories: { _key: string; title: string }[] }

defineProps<{
  book: BookWithCategories
}>()
</script>

<template>
  <NuxtLink :to="`/books/${book.slug?.current}`" class="book-card">
    <div class="book-card__image">
      <NuxtImg 
        v-if="book.cover" 
        :src="useSanityImage(book.cover)?.url()" 
        :alt="book?.title || 'Couverture du livre'" 
        width="300"
        height="400"
        fit="crop"
      />
      <div v-else class="book-card__image-placeholder">
        <Icon name="lucide:book-open" size="48" />
      </div>
    </div>
    <div class="book-card__content">
      <h2 class="book-card__title">{{ book.title }}</h2>
      <p v-if="book.publishedAt" class="book-card__date">
        Publié le {{ new Date(book.publishedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </p>
      <div v-if="book.categories && book.categories.length" class="book-card__categories">
        <span 
          v-for="category in book.categories" 
          :key="category._key" 
          class="book-card__category"
        >
          {{ category.title }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
