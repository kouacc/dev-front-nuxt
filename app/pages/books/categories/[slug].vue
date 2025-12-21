<script setup lang="ts">
import type { SanityBook } from '~/types/cms/book'

const query = groq`*[_type == "book" && $slug in categories[]->slug.current]{title, slug, cover, author->{ name }, publishedAt, categories[]->{ name, slug }}`

const { data: books } = await useLazySanityQuery<SanityBook[]>(query, useRoute().params)
/* const categoryName = computed(() => {
  if (books.value && books.value.length > 0 && books.value[0].categories) {
    const category = books.value[0].categories.find(cat => cat.slug.current === useRoute().params.slug)
    return category ? category.name : ''
  }
  return ''
}) */
</script>

<template>
  <div v-if="books">
    <!-- <UITitle tag="h1">{{ categoryName }}</UITitle> -->
    <pre>{{ books }}</pre>
    <NuxtLink v-for="book in books" :key="book._id" :to="`/books/${book.slug}`">
      <div>
        <NuxtImg v-if="book.cover" :src="useSanityImage(book.cover)?.url()" :alt="book?.title" />
        <h2>{{ book.title }}</h2>
        <p>Publié le {{ new Date(book.publishedAt).toLocaleDateString() }}</p>
        <p>par {{ book.author.name }}</p>
      </div>
    </NuxtLink>
  </div>
</template>