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
    <div>
      <UITitle type="heading2">Ingrédients</UITitle>
      <ul>
        <li v-for="(ing, index) in recipe?.ingredients" :key="index">
          {{ ing.quantity }} {{ ing.unit }} {{ ing.name }}
        </li>
      </ul>
    </div>
    <div>
      <UITitle type="heading2">Etapes</UITitle>
      <ul>
        <li v-for="(step, index) in recipe?.instructions" :key="index">
          {{ step.step_number }}. {{ step.description }}
        </li>
      </ul>
    </div>
  </div>
</template> 