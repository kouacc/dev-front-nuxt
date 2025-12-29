<script setup lang="ts">
const props = defineProps<{
  recipeId: number | null
}>()

const toast = useToast()

const { data: ingredients } = await useAsyncData('ingredients', async () => {
  const { data } = await $fetch<APIResponse<Ingredient[]>>('/ingredients', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

const selectedIngredients = ref<{ ingredient_id: number; quantity: string }[]>([
  { ingredient_id: 0, quantity: '1' }
])

const addIngredient = () => {
  selectedIngredients.value.push({ ingredient_id: 0, quantity: '1' })
}

const removeIngredient = (index: number) => {
  selectedIngredients.value.splice(index, 1)
}

const onSubmit = async () => {
  if (!props.recipeId) {
    toast.addToast({
      title: 'Erreur',
      message: 'Veuillez d\'abord créer une recette.',
      type: 'error'
    })
    return
  }

  const validIngredients = selectedIngredients.value.filter(i => i.ingredient_id !== 0)
  
  await $fetch(`/recipes/${props.recipeId}/ingredients`, {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: validIngredients,
    onResponse ({ response }) {
      if (response.status !== 201) {
        toast.addToast({
          title: 'Erreur',
          message: 'Une erreur est survenue lors de l\'ajout des ingrédients.',
          type: 'error'
        })
        return
      }
      toast.addToast({
        title: 'Ingrédients ajoutés',
        message: 'Les ingrédients ont bien été ajoutés à la recette.',
        type: 'success'
      })
    }
  })
}
</script>

<template>
  <form class="fr-addingredient" @submit.prevent="onSubmit">
    <div class="fr-addingredient__title">
      <UITitle type="heading2">Ingrédients</UITitle>
      <UIButton type="button" size="small" @click="addIngredient">
        <Icon name="lucide:plus" />Ajouter
      </UIButton>
    </div>
    <div v-for="(item, index) in selectedIngredients" :key="index" class="fr-addingredient__row">
      <UISelect v-model="item.ingredient_id" label="Ingrédient" class="fr-addingredient__row__select">
        <UISelectOption :value="0" disabled>Choisir un ingrédient</UISelectOption>
        <UISelectOption v-for="ingredient in ingredients" :key="ingredient.ingredient_id" :value="ingredient.ingredient_id">
          {{ ingredient.name }} ({{ ingredient.unit }})
        </UISelectOption>
      </UISelect>
      <UIInput v-model="item.quantity" type="number" label="Quantité" min="1" class="fr-addingredient__row__quantity" />
      <UIButton type="button" size="small" variant="ghost" :disabled="selectedIngredients.length === 1" @click="removeIngredient(index)">
        <Icon name="lucide:x" />
      </UIButton>
    </div>
    <UIButton as="button" type="submit">Envoyer</UIButton>
  </form>
</template>
