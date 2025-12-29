<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'aside'
})

</script>

<template>
  <div>
    <UITitle>Créer une nouvelle recette</UITitle>
    <div class="p-dashboard-add">
      <AddRecipeForm />
      <AddInstructionForm recipe-id="1" />
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