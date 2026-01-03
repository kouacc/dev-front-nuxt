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

          <div v-if="book.categories && book.categories.length" class="book-page__categories">
            <span 
              v-for="category in book.categories" 
              :key="category._key" 
              class="book-page__category"
            >
              {{ category.title }}
            </span>
          </div>
        </div>
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

<style lang="scss">
.book-page {
  min-height: 100vh;
  background-color: var(--color-gray-50);

  &__container {
    max-width: rem(1200);
    margin: 0 auto;
    padding: rem(40) rem(20);
  }

  &__breadcrumb {
    margin-bottom: rem(32);
  }

  &__header {
    display: grid;
    grid-template-columns: rem(400) 1fr;
    gap: rem(48);
    margin-bottom: rem(48);

    @include medium-down {
      grid-template-columns: 1fr;
      gap: rem(32);
    }
  }

  &__cover {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    border-radius: rem(16);
    overflow: hidden;
    background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include medium-down {
      max-width: rem(300);
      margin: 0 auto;
    }
  }

  &__cover-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-primary-500);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: rem(24);
  }

  &__title {
    margin: 0;
    color: var(--color-gray-900);
    font-size: rem(48);
    line-height: 1.2;

    @include medium-down {
      font-size: rem(32);
      text-align: center;
    }
  }

  &__author,
  &__date {
    display: flex;
    align-items: center;
    gap: rem(12);
    font-size: rem(16);
    color: var(--color-gray-700);

    @include medium-down {
      justify-content: center;
    }

    svg {
      color: var(--color-primary-500);
    }
  }

  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: rem(12);

    @include medium-down {
      justify-content: center;
    }
  }

  &__category {
    display: inline-block;
    padding: rem(8) rem(16);
    background-color: var(--color-primary-100);
    color: var(--color-primary-700);
    border-radius: rem(20);
    font-size: rem(14);
    font-weight: 500;
  }
}
</style>