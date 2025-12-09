<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'

const CAT_QUERY = groq`*[ _type == "book"]|order(publishedAt desc)[0...10]{title, slug, publishedAt, cover, author->{ name }, categories[]->{ ... }}`
const { data: books } = await useLazySanityQuery<SanityDocument[]>(CAT_QUERY)
</script>

<template>
  <div>
    <UITitle tag="h1">Liste des livres</UITitle>
    <NuxtLink v-for="book in books" :key="book._id" :to="`/books/${book.slug.current}`">
      <div>
        <NuxtImg v-if="book.cover" :src="useSanityImage(book.cover)?.url()" :alt="book?.title" />
        <h2>{{ book.title }}</h2>
        <p>Publié le {{ new Date(book.publishedAt).toLocaleDateString() }}</p>
        <p>par {{ book.author.name }}</p>
      </div>
    </NuxtLink>
    <pre>{{ books }}</pre>
  </div>
</template>