<script setup lang="ts">
const { data: recipes } = await useAsyncData('recipes', async () => {
  const { data } = await $fetch<APIResponse<Recipe[]>>('/recipes', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

const modal = ref<boolean>(false)
const selectedRecipe = ref<Recipe | null>(null)

const openModal = (recipe: Recipe) => {
  selectedRecipe.value = recipe
  modal.value = true
}
</script>

<template>
  <UITitle>Gestion des recettes</UITitle>
  <ul class="recipes-list">
    <li v-for="recipe in recipes" :key="recipe.recipe_id" class="recipes-list__item">
      <NuxtImg :src="'/recipes/' + recipe.image_url" alt="Image de la recette" width="50" height="50" class="recipes-list__item-image" />
      <span class="recipes-list__item-title">{{ recipe.title }}</span>
      <div class="recipes-list__item-actions">
        <UIButton size="small" variant="outline">Modifier</UIButton>
        <UIButton size="small" variant="outline" @click="openModal(recipe)">Supprimer</UIButton>
      </div>
    </li>
  </ul>
</template>
