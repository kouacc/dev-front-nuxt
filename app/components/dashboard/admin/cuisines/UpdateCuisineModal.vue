<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const cuisineData = defineModel<Cuisine>('cuisine', { required: true })
const cuisines = defineModel<Cuisine[]>('cuisines', { required: true })

const toast = useToast()

const formContent = reactive({
  name: ''
})

const updateCuisine = async () => {
  if (!formContent.name.trim()) {
    toast.addToast({
      title: 'Erreur',
      message: 'Le nom de la cuisine est requis.',
      type: 'error'
    })
    return
  }

  if (formContent.name.trim() === cuisineData.value.name) {
    formContent.name = ''
    open.value = false
    return
  }

  await $fetch(`/cuisines/${cuisineData.value.cuisine_id}`, {
    method: 'PUT',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: {
      name: formContent.name.trim()
    },
    onResponse ({ response }) {
      if (response.status !== 200) {
        toast.addToast({
          title: 'Erreur',
          message: 'Une erreur est survenue lors de la mise à jour de la cuisine.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Cuisine mise à jour',
        message: 'La cuisine a bien été mise à jour.',
        type: 'success'
      })
      const resdata = response._data as APIResponse<Cuisine>

      const index = cuisines.value.findIndex(c => c.cuisine_id === cuisineData.value.cuisine_id)
      if (index !== -1) {
        cuisines.value[index] = resdata.data
      }

      cuisineData.value = {} as Cuisine
      formContent.name = ''
      open.value = false
    }
  })

  
}

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