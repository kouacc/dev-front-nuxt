<script setup lang="ts">
import type { Book } from '~/types/sanity.types'

const BOOKS_PER_PAGE = 12
const currentPage = ref(1)

const offset = computed(() => (currentPage.value - 1) * BOOKS_PER_PAGE)

const countQuery = groq`count(*[_type == "book"])`
const { data: totalBooks } = await useLazySanityQuery<number>(countQuery)

const booksQuery = computed(() => {
  return groq`*[_type == "book"] | order(publishedAt desc)[${offset.value}...${offset.value + BOOKS_PER_PAGE}]{
    _id,
    title,
    slug,
    publishedAt,
    cover,
    author->{ name },
    categories[]->{ _key, title }
  }`
})


type BookWithCategories = Omit<Book, 'categories'> & { categories: { _key: string; title: string }[] }
const { data: books, refresh: refreshBooks } = await useLazySanityQuery<BookWithCategories[]>(booksQuery.value)

const totalPages = computed(() => Math.ceil((totalBooks.value || 0) / BOOKS_PER_PAGE))

watch(currentPage, async () => {
  await refreshBooks()
})
</script>

<template>
  <div class="books-page">
    <div class="books-page__header">
      <UITitle tag="h1">Livres</UITitle>
      <p class="books-page__count">{{ totalBooks }} livre{{ totalBooks && totalBooks > 1 ? 's' : '' }}</p>
    </div>

    <div v-if="books && books.length > 0" class="books-page__grid">
      <BookCard v-for="book in books" :key="book._id" :book="book" />
    </div>

    <div v-else class="books-page__empty">
      <Icon name="lucide:book-open" size="64" />
      <p>Aucun livre disponible pour le moment</p>
    </div>

    <div v-if="totalPages > 1" class="books-page__pagination">
      <UIPagination v-model:page="currentPage" :page-amount="totalPages" />
    </div>
  </div>
</template>

<style lang="scss">
.books-page {
  max-width: rem(1400);
  margin: 0 auto;

  &__header {
    margin-bottom: rem(40);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__count {
    font-size: rem(16);
    color: var(--color-gray-600);
    margin: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(rem(280), 1fr));
    gap: rem(32);
    margin-bottom: rem(48);

    @include medium-down {
      grid-template-columns: repeat(auto-fill, minmax(rem(200), 1fr));
      gap: rem(20);
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: rem(20);
    padding: rem(80) rem(20);
    color: var(--color-gray-500);

    p {
      font-size: rem(18);
      margin: 0;
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    padding: rem(40) 0;
  }
}
</style>