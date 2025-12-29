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

const errors = reactive({
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
        <UIInput
          v-model="formContent.name"
          label="Nom de l'ingrédient"
          :color="errors.name ? 'error' : 'default'"
          :helper-text="errors.name || null"
          required
        />
        <UIInput
          v-model="formContent.unit"
          label="Unité (ex: grammes, millilitres, pièces)"
          :color="errors.unit ? 'error' : 'default'"
          :helper-text="errors.unit || null"
          required
        />
      </form>
    </template>

    <template #footer>
      <UIButton type="button" variant="ghost" @click="onClose()">Annuler</UIButton>
      <UIButton type="button" @click="onSubmit()">Créer</UIButton>
    </template>
  </UIModal>
</template>

<style lang="scss">
.md-newingredient {
  display: flex;
  flex-direction: column;
  gap: rem(16);
}
</style>