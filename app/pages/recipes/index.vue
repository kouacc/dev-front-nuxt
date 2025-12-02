<script setup lang="ts">
const { data: recipes, error } = await useAsyncData('recipes', async () => {
  const { data } = await $fetch<APIResponse<Recipe[]>>('/recipes', {
    baseURL: useRuntimeConfig().public.apiUrl,
    query: {
      
    }
  })
  return data
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Erreur lors du chargement des recettes.'
  })
}

const filters = ref()
</script>

<template>
  <div>
    <UITitle type="heading1">Toutes les recettes</UITitle>
    <div>
      <UITitle type="heading2">Filtres</UITitle>
    </div>
  </div>
</template>