<script setup lang="ts">
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
  <div class="p-recipe">
    <div class="p-recipe__header">
      <UITitle type="heading1">{{ recipe?.title }}</UITitle>
      <p class="p-recipe__description">{{ recipe?.description }}</p>
    </div>

    <div class="p-recipe__body">
      <div class="p-recipe__grid">
        <div class="p-recipe__left">
          <div class="p-recipe__cover">
            <NuxtImg 
              :src="'/recipes/' + recipe?.image_url || 'https://placehold.co/1000x600'" 
              :alt="recipe?.title" 
            />
          </div>

          <div class="p-recipe__info-grid">
            <div class="p-recipe__info">
              <UITitle type="heading3">Cuisine</UITitle>
              <p class="p-recipe__info-value">{{ recipe?.cuisine_name }}</p>
            </div>

            <div class="p-recipe__info">
              <UITitle type="heading3">Objectif</UITitle>
              <p class="p-recipe__info-value">{{ recipe?.goal_name }}</p>
            </div>

            <div class="p-recipe__info">
              <UITitle type="heading3">Régime</UITitle>
              <p class="p-recipe__info-value">{{ recipe?.diet_name }}</p>
            </div>

            <div class="p-recipe__info">
              <UITitle type="heading3">Allergies</UITitle>
              <p class="p-recipe__info-value">{{ recipe?.allergy_name }}</p>
            </div>
          </div>
        </div>
      </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template> 

<style lang="scss">
.p-recipe {
  max-width: rem(1200);
  margin: 0 auto;
  padding: rem(32) rem(16);

    border-radius: rem(16);
  }

  }
}
</style>