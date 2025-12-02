<script setup lang="ts">
const { data: recipes, error } = await useAsyncData('recipes', async () => {
  const { data } = await $fetch<APIResponse<FullRecipe[]>>('/recipes', {
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
    <div class="hero">
      
    </div>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.recipe_id">
        <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.recipe_id } }">{{ recipe.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.hero {
  border-radius: rem(24);
  width: 100%;
  height: rem(300);
  background-color: var(--color-grey-200);
}
</style>
