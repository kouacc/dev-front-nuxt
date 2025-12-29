<script setup lang="ts">
const props = defineProps<{
  recipeId: number | null
}>()

const toast = useToast()

const { data: ingredients } = await useAsyncData('ingredients', async () => {
  const { data } = await $fetch<APIResponse<Ingredient[]>>('/ingredients', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})
</script>

<template>
</template>
