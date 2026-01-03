<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const cuisineData = defineModel<Cuisine>('cuisine', { required: true })
const cuisines = defineModel<Cuisine[]>('cuisines', { required: true })

const toast = useToast()

const deleteCuisine = async () => {
  await $fetch(`/cuisines/${cuisineData.value.cuisine_id}`, {
    method: 'DELETE',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    onResponse ({ response }) {
      if (response.status !== 200) {
        toast.addToast({
          title: 'Erreur',
          message: response._data.message || 'Une erreur est survenue lors de la suppression de la cuisine.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Cuisine supprimée',
        message: 'La cuisine a bien été supprimée.',
        type: 'success'
      })
      
      const index = cuisines.value.findIndex(c => c.cuisine_id === cuisineData.value.cuisine_id)
      if (index !== -1) {
        cuisines.value.splice(index, 1)
      }

      open.value = false
      cuisineData.value = {} as Cuisine
    }
  })
}

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