<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false }) 
const ingredients = defineModel<Omit<Ingredient, 'quantity'>[]>('ingredients', { default: [] })

const toast = useToast()

const formContent = reactive({
  name: '',
  unit: '',
  clear (): void {
    this.name = ''
    this.unit = ''
  }
})
</script>

<template>
  <UIModal v-model="open" title="Créer un nouvel ingrédient">
    <template #content>
      <form class="md-newingredient" @submit.prevent="onSubmit()">
      </form>
    </template>
