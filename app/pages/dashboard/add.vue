<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'aside'
})

const recipeId = ref<number | null>(null)
</script>

<template>
  <div class="p-dashboard-add-wrapper">
    <UITitle>Créer une nouvelle recette</UITitle>
    <div class="p-dashboard-add">
      <div class="p-dashboard-add__left">
        <AddRecipeForm v-model="recipeId" />
        <AddIngredientForm :recipe-id="recipeId" />
      </div>
      <div class="p-dashboard-add__right">
        <AddInstructionForm :recipe-id="recipeId" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.p-dashboard-add-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.p-dashboard-add {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: rem(32);
  margin-top: rem(12);
  flex: 1;
  min-height: 0;
  overflow: hidden;

  &__left {
    display: flex;
    flex-direction: column;
    gap: rem(32);
    overflow-y: auto;
  }

  &__right {
    overflow-y: auto;
  }
}
</style>