<script setup lang="ts">
definePageMeta({
  layout: 'aside'
})

const { id } = useRoute().params

const { data: recipe, error } = await useAsyncData(`recipe-${id}`, async () => {
  const { data } = await $fetch<APIResponse<FullRecipe>>(`/recipes/${id}`, {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: error.value.statusMessage || 'Erreur lors du chargement de la recette.'
  })
}
</script>

<template>
  <div>
    <UITitle>{{ recipe?.title }}</UITitle>
    <pre>{{ recipe }}</pre>
  </div>
</template> 