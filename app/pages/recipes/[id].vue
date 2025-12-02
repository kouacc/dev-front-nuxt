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
  <div>
    <UITitle type="heading1">{{ recipe?.title }}</UITitle>
    <NuxtImg src="https://placehold.co/1000x600" :alt="recipe?.title" />
    <div class="recipe__content">
      <div>
        <UITitle type="heading2">Etapes</UITitle>
        <ul>
          <li v-for="(step, index) in recipe?.instructions" :key="index">
            {{ step.step_number }}. {{ step.description }}
          </li>
        </ul>
      </div>
      <aside>
        <UITitle type="heading2">Ingrédients</UITitle>
        <ul>
          <li v-for="(ing, index) in recipe?.ingredients" :key="index">
            {{ ing.quantity }} {{ ing.unit }} de {{ ing.name }}
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template> 

<style lang="scss">
.recipe__content {
  display: flex;
  gap: rem(32);

  aside {
    flex: 1;
    max-width: rem(300);
    padding: rem(16);
    background-color: var(--color-primary-200);
    border-radius: rem(16);
  }

  div {
    flex: 2;
  }
}
</style>