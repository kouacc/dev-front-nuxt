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
.p-dashboard-add {
  display: flex;
  gap: rem(32);
}
</style>