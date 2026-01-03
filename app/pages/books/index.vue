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
  <div>
    <UITitle tag="h1">Liste des livres</UITitle>
    <NuxtLink v-for="book in books" :key="book._id" :to="`/books/${book.slug?.current}`">
      <div>
        <NuxtImg v-if="book.cover" :src="useSanityImage(book.cover)?.url()" :alt="book?.title" />
        <h2>{{ book.title }}</h2>
        <p>Publié le {{ new Date(book.publishedAt ?? '').toLocaleDateString() }}</p>
        <!-- <p>par {{ book.author?.name ?? '' }}</p> -->
      </div>
    </NuxtLink>
    <pre>{{ books }}</pre>
  </div>
</template>