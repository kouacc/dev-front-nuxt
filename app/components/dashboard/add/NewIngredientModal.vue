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

const isAbbreviation = (value: string): boolean => {
  const trimmed = value.trim()

  if (trimmed.length <= 3) return true
  if (trimmed.endsWith('.')) return true

  if (/^[bcdfghjklmnpqrstvwxz]+$/i.test(trimmed) && trimmed.length <= 4) return true
  return false
}

const validateForm = (): boolean => {
  errors.clear()
  let isValid = true

  if (!formContent.name.trim()) {
    errors.name = 'Le nom de l\'ingrédient est requis.'
    isValid = false
  } else if (ingredients.value.some(
    ing => ing.name.toLowerCase() === formContent.name.trim().toLowerCase()
  )) {
    errors.name = 'Cet ingrédient existe déjà.'
    isValid = false
  }

  if (!formContent.unit.trim()) {
    errors.unit = 'L\'unité est requise.'
    isValid = false
  } else if (isAbbreviation(formContent.unit)) {
    errors.unit = 'Veuillez utiliser le nom complet de l\'unité (ex: grammes, millilitres, pièces).'
    isValid = false
  }

  return isValid
}

const onSubmit = async () => {
  if (!validateForm()) return

  await $fetch('/ingredients', {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: formContent,
    onResponse ({ response }) {
      if (response.status !== 201) {
        toast.addToast({
          title: 'Erreur',
          message: 'Une erreur est survenue lors de la création de l\'ingrédient.',
          type: 'error'
        })
        return
      }
      const data = response._data as APIResponse<Omit<Ingredient, 'quantity'>>
      ingredients.value = [...ingredients.value, data.data]
      toast.addToast({
        title: 'Ingrédient créé',
        message: 'L\'ingrédient a bien été créé.',
        type: 'success'
      })
      formContent.clear()
      errors.clear()
      open.value = false
    }
  })
}

const onClose = () => {
  formContent.clear()
  errors.clear()
  open.value = false
}
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