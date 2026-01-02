<script setup lang="ts">
const toast = useToast()

const open = defineModel<boolean>('open', { default: false })
const recipes = defineModel<Recipe[]>('recipes', {
  required: true
})
const recipeData = defineModel<Recipe>('recipe', {
  required: true
})

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