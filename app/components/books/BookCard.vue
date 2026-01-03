<script setup lang="ts">
import type { Book } from '~/types/sanity.types'

type BookWithCategories = Omit<Book, 'categories'> & { categories: { _key: string; title: string }[] }

defineProps<{
  book: BookWithCategories
}>()
</script>

<template>
</template>
