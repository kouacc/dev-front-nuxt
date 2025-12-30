<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const cuisines = defineModel<Cuisine[]>('cuisines', { required: true })

const toast = useToast()

const formContent = reactive({
  name: '',
  clear (): void {
    this.name = ''
  }
})
const onClose = () => {
  formContent.clear()
  open.value = false
}
</script>

<template>
  <UIModal v-model="open" title="Créer une nouvelle cuisine" @close="onClose">
    <template #content>
      <form class="md-newcuisine" @submit.prevent="createCuisine()">
        <UIInput v-model="formContent.name" label="Nom de la cuisine" required />
      </form>
    </template>

    <template #footer>
      <UIButton variant="ghost" @click="onClose">Annuler</UIButton>
      <UIButton variant="default" :disabled="formContent.name.length === 0" @click="createCuisine">Créer</UIButton>
    </template>
  </UIModal>
</template>