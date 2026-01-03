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

const createCuisine = async () => {
  if (!formContent.name.trim()) {
    toast.addToast({
      title: 'Erreur',
      message: 'Le nom de la cuisine est requis.',
      type: 'error'
    })
    return
  }

  await $fetch('/cuisines', {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: {
      name: formContent.name.trim()
    },
    onResponse ({ response }) {
      if (response.status !== 201) {
        toast.addToast({
          title: 'Erreur',
          message: 'Une erreur est survenue lors de la création de la cuisine.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Cuisine créée',
        message: 'La cuisine a bien été créée.',
        type: 'success'
      })
      const resdata = response._data as APIResponse<Cuisine>

      cuisines.value.push(resdata.data)
      formContent.clear()
      open.value = false
    }
  })
}

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