<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const ingredientData = defineModel<Ingredient>('ingredient', {
  required: true
})
const ingredients = defineModel<Ingredient[]>('ingredients', {
  required: true
})

const toast = useToast()

const formContent = reactive({
  name: '',
  unit: ''
})

watch(
  () => ingredientData.value,
  (newIngredient) => {
    if (newIngredient?.name) {
      formContent.name = newIngredient.name
    }
    if (newIngredient?.unit) {
      formContent.unit = newIngredient.unit
    }
  },
  { immediate: true }
)

const updateIngredient = async () => {
  if (!formContent.name.trim()) {
    toast.addToast({
      title: 'Erreur',
      message: 'Le nom de l\'ingrédient est requis.',
      type: 'error'
    })
    return
  }

  if (!formContent.unit.trim()) {
    toast.addToast({
      title: 'Erreur',
      message: 'L\'unité de l\'ingrédient est requise.',
      type: 'error'
    })
    return
  }

  if (
    formContent.name.trim() === ingredientData.value.name &&
    formContent.unit.trim() === ingredientData.value.unit
  ) {
    formContent.name = ''
    formContent.unit = ''
    open.value = false
    return
  }

  await $fetch(`/ingredients/${ingredientData.value.ingredient_id}`, {
    method: 'PUT',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: {
      name: formContent.name.trim(),
      unit: formContent.unit.trim()
    },
    onResponse ({ response }) {
      if (response.status !== 200) {
        toast.addToast({
          title: 'Erreur',
          message:
            'Une erreur est survenue lors de la mise à jour de l\'ingrédient.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Ingrédient mis à jour',
        message: 'L\'ingrédient a bien été mis à jour.',
        type: 'success'
      })
      const resdata = response._data as APIResponse<Ingredient>

      const index = ingredients.value.findIndex(
        (i) => i.ingredient_id === ingredientData.value.ingredient_id
      )
      if (index !== -1) {
        ingredients.value[index] = resdata.data
      }

      ingredientData.value = {} as Ingredient
      formContent.name = ''
      open.value = false
    }
  })
}

const onClose = () => {
  formContent.name = ''
  formContent.unit = ''
  ingredientData.value = {} as Ingredient
  open.value = false
}
</script>

<template>
  <UIModal v-model="open" :title="'Mettre à jour ' + ingredientData.name" @close="onClose">
    <template #content>
      <form class="md-updateingredient" @submit.prevent="updateIngredient()">
        <UIInput v-model="formContent.name" label="Nom de l'ingrédient" required />
        <UIInput v-model="formContent.unit" label="Unité" required />
      </form>
    </template>

    <template #footer>
      <UIButton type="button" variant="ghost" @click="onClose()">Annuler</UIButton>
      <UIButton type="button" @click="updateIngredient()">Mettre à jour</UIButton>
    </template>
  </UIModal>
</template>
