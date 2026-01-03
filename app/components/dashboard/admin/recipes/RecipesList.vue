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
  <DeleteRecipeModal v-if="recipes && selectedRecipe" v-model="modal" :recipes="recipes" :recipe="selectedRecipe"  />
</template>

<style lang="scss">
.recipes-list {
  display: grid;
  grid-auto-flow: row;
  background-color: var(--color-white);
  border: 1px solid var(--border-color);
  border-radius: rem(12);
  overflow: hidden;
  padding: 0;

  &__item {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background-color: var(--card-bg-color);
    transition: background-color 0.2s;

    @include medium-down {
      grid-template-columns: 50px 1fr;
      grid-template-rows: auto auto;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
    }

    &:hover {
      background-color: var(--hover-bg-color, rgba(0, 0, 0, 0.02));
    }
  }

  &__item-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: rem(4);

    @include medium-down {
      grid-row: 1 / 3;
    }
  }

  &__item-title {
    font-weight: 500;
    flex: 1;

    @include medium-down {
      grid-column: 2;
      grid-row: 1;
    }
  }

  &__item-actions {
    display: flex;
    gap: 0.5rem;
    margin-left: auto;

    @include medium-down {
      grid-column: 2;
      grid-row: 2;
      margin-left: 0;
      width: 100%;

      button {
        flex: 1;
      }
    }
  }
}
</style>
