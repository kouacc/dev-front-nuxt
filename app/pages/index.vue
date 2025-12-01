<script setup lang="ts">
definePageMeta({
  layout: 'aside'
})

const { data: recipes, error } = await useAsyncData('recipes', async () => {
  const { data } = await $fetch<{ data: Recipe[] }>('/recipes', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Erreur lors du chargement des recettes.'
  })
}
</script>

<template>
  <div>
    <h1>Salut</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.recipe_id">
        <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.recipe_id } }">{{ recipe.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
