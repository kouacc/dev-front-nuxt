<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const ingredientData = defineModel<Ingredient>('ingredient', {
  required: true
})
const ingredients = defineModel<Ingredient[]>('ingredients', {
  required: true
})

const toast = useToast()

const deleteIngredient = async () => {
  await $fetch(`/ingredients/${ingredientData.value.ingredient_id}`, {
    method: 'DELETE',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    onResponse ({ response }) {
      if (response.status !== 200) {
        toast.addToast({
          title: 'Erreur',
          message:
            response._data.message ||
            'Une erreur est survenue lors de la suppression de l\'ingrédient.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Ingrédient supprimé',
        message: 'L\'ingrédient a bien été supprimé.',
        type: 'success'
      })

      const index = ingredients.value.findIndex((i) => i.ingredient_id === ingredientData.value.ingredient_id)
      if (index !== -1) {
        ingredients.value.splice(index, 1)
      }

      open.value = false
      ingredientData.value = {} as Ingredient
    }
  })
}

const onClose = () => {
  open.value = false
  ingredientData.value = {} as Ingredient
}
</script>

<template>
  <UIModal v-model="open" :title="'Supprimer ' + ingredientData.name" @close="onClose">
    <template #content>
      <p>
        Êtes-vous sûr de vouloir supprimer {{ ingredientData.name }} ? Cette action est irréversible.
      </p>
      <p>
        Merci de vous assurer que les recettes associées ont été supprimées ou ont été modifiées.
      </p>
    </template>
    <template #footer>
      <UIButton variant="ghost" @click="onClose">Annuler</UIButton>
      <UIButton variant="default" @click="deleteIngredient">Supprimer</UIButton>
    </template>
  </UIModal>
</template>
