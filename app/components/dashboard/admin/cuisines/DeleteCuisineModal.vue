<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const cuisineData = defineModel<Cuisine>('cuisine', { required: true })
const cuisines = defineModel<Cuisine[]>('cuisines', { required: true })

const toast = useToast()

const onClose = () => {
  open.value = false
  cuisineData.value = {} as Cuisine
}
</script>

<template>
  <UIModal v-model="open" :title="'Supprimer ' + cuisineData.name" @close="onClose">
    <template #content>
      <p>Êtes-vous sûr de vouloir supprimer {{ cuisineData.name }} ? Cette action est irréversible.</p>
      <p>Merci de vous assurer que les recettes associés ont été supprimées ou ont été modifiées.</p>
    </template>
    <template #footer>
      <UIButton variant="ghost" @click="onClose">Annuler</UIButton>
      <UIButton variant="default" @click="deleteCuisine">Supprimer</UIButton>
    </template>
  </UIModal>
</template>