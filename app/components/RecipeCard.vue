<script setup lang="ts">
defineProps<{ recipe: Recipe }>()
</script>

<template>
  <div class="recipe-card">
    <NuxtImg :src="'/recipes/' + recipe.image_url" />
    <p>{{ recipe.title }}</p>
    <UIButton type="button">Voir</UIButton>
  </div>
</template>

<style lang="scss">
.recipe-card {
  --recipecard-bg-color: var(--color-white);

  border-radius: rem(12);
  padding: rem(8);
  background-color: var(--recipecard-bg-color);

  > img {
    border-radius: rem(12);
    max-width: rem(300); 
    object-fit: cover;
  }
}
</style>