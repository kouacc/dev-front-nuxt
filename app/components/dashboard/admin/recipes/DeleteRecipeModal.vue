<script setup lang="ts">
const toast = useToast()

const open = defineModel<boolean>('open', { default: false })
const recipes = defineModel<Recipe[]>('recipes', {
  required: true
})
const recipeData = defineModel<Recipe>('recipe', {
  required: true
})

const deleteRecipe = async () => {
  await $fetch(`/recipes/${recipeData.value.recipe_id}`, {
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
            'Une erreur est survenue lors de la suppression de la recette.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Recette supprimée',
        message: 'La recette a bien été supprimée.',
        type: 'success'
      })

      const index = recipes.value.findIndex((r) => r.recipe_id === recipeData.value.recipe_id)
      if (index !== -1) {
        recipes.value.splice(index, 1)
      }

      open.value = false
      recipeData.value = {} as Recipe
    }
  })
}

const onClose = () => {
  open.value = false
  recipeData.value = {} as Recipe
}

</script>

<template>
  <UIModal v-model="open" title="Supprimer la recette" @close="onClose">
    <template #content>
      <p>
        Êtes-vous sûr de vouloir supprimer la recette "{{ recipeData.title }}" ? Cette action est irréversible.
      </p>
      <p>
        Merci de vous assurer que toutes les dépendances associées ont été supprimées ou modifiées.
      </p>
    </template>

    <template #footer>
      <UIButton variant="ghost" @click="onClose">Annuler</UIButton>
      <UIButton variant="default" @click="deleteRecipe">Supprimer</UIButton>
    </template>
  </UIModal>
</template>