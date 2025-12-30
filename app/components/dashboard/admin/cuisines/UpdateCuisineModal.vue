<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const cuisineData = defineModel<Cuisine>('cuisine', { required: true })
const cuisines = defineModel<Cuisine[]>('cuisines', { required: true })

const toast = useToast()

const formContent = reactive({
  name: ''
})

const onClose = () => {
  formContent.name = ''
  cuisineData.value = {} as Cuisine
  open.value = false
}
</script>

<template>
  <UIModal v-model="open" :title="'Mettre à jour ' + cuisineData.name" @close="onClose">
    <template #content>
      <form class="md-updatecuisine" @submit.prevent="updateCuisine()">
        <UIInput v-model="formContent.name" label="Nom de la cuisine" required />
      </form>
    </template>

    <template #footer>
      <UIButton type="button" variant="ghost" @click="onClose()">Annuler</UIButton>
      <UIButton type="button" @click="updateCuisine()">Mettre à jour</UIButton>
    </template>
  </UIModal>
</template>