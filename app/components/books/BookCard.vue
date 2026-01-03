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

<style lang="scss" scoped>
.book-card {
  display: flex;
  flex-direction: column;
  border-radius: rem(12);
  overflow: hidden;
  background-color: var(--color-white);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: scale(1.01);
  }

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-primary-500);
  }

  &__content {
    padding: rem(20);
    display: flex;
    flex-direction: column;
    gap: rem(12);
    flex: 1;
  }

  &__title {
    font-size: rem(20);
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-gray-900);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: rem(14);
    color: var(--color-gray-600);
    margin: 0;
  }

  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: rem(8);
    margin-top: auto;
  }

  &__category {
    display: inline-block;
    padding: rem(4) rem(12);
    background-color: var(--color-primary-100);
    color: var(--color-primary-700);
    border-radius: rem(16);
    font-size: rem(12);
    font-weight: 500;
  }
}
</style>