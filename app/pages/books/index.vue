<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'

const BOOKS_QUERY = groq`*[ _type == "book"]|order(publishedAt desc)[0...10]{_id, title, slug, publishedAt}`

const { data: books } = await useLazySanityQuery<SanityDocument[]>(BOOKS_QUERY)
console.log(books.value)
</script>

<template>
  <div>
    <UITitle tag="h1">Liste des livres</UITitle>
    <pre>{{ books }}</pre>
    <NuxtLink v-for="book in books" :key="book._id" :to="`/books/${book.slug.current}`">
      <div>
        <h2>{{ book.title }}</h2>
        <p>Publié le {{ new Date(book.publishedAt).toLocaleDateString() }}</p>
      </div>
    </NuxtLink>
  </div>
</template>