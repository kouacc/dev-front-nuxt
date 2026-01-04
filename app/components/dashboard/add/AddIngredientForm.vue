<script setup lang="ts">
const props = defineProps<{
  recipeId: number | null,
  mode: 'create' | 'edit',
  recipeData: FullRecipe | null
}>()

const toast = useToast()

const { data: ingredients } = await useAsyncData('ingredients', async () => {
  const { data } = await $fetch<APIResponse<Ingredient[]>>('/ingredients', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

const modal = ref<boolean>(false)

const selectedIngredients = ref<{ ingredient_id: number; quantity: string }[]>([
  { ingredient_id: 0, quantity: '1' }
])

watch(() => props.recipeData, (data) => {
  if (data && data.ingredients && data.ingredients.length > 0) {
    selectedIngredients.value = data.ingredients.map(ing => ({
      ingredient_id: ing.ingredient_id,
      quantity: ing.quantity.toString()
    }))
  }
}, { immediate: true })


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
      <div class="fr-addingredient__btns">
        <UIButton  type="button" size="small" variant="ghost" @click="modal = true">Créer un nouvel ingrédient</UIButton>
        <UIButton type="button" size="small" @click="addIngredient">
          <Icon name="lucide:plus" />Ajouter
        </UIButton>
      </div>
    </div>
    <ul class="fr-addingredient__list">
      <li v-for="(item, index) in selectedIngredients" :key="index" class="fr-addingredient__row">
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
      </li>
    </ul>
    <UIButton v-if="props.recipeId" as="button" type="submit">Envoyer</UIButton>
    <UITooltip v-else content="Merci de compléter et d'envoyer la recette avant les ingrédients">
      <UIButton as="button" type="submit" disabled>Envoyer</UIButton>
    </UITooltip>
  </form>
  <NewIngredientModal v-if="ingredients" v-model:open="modal" v-model:ingredients="ingredients" />
</template>

<style lang="scss">
.fr-addingredient {
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: rem(16);
  padding: rem(24);
  border-radius: rem(8);
  border: 1px solid var(--color-grey-200);
  height: 100%;

  @include large-down {
    height: auto;
  }

  @include medium-down {
    padding: rem(20);
    gap: rem(14);
  }

  @include small-only {
    padding: rem(16);
    gap: rem(12);
  }

  > *:not(button, .ui-tooltip) {
    width: 100%;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include medium-down {
      flex-direction: column;
      align-items: flex-start;
      gap: rem(12);
    }
  }

  &__btns {
    display: flex;
    gap: rem(8);

    @include medium-down {
      width: 100%;
      flex-wrap: wrap;
    }

    @include small-only {
      flex-direction: column;
      gap: rem(6);
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: rem(8);
    width: 100%;
    height: 100%;
    overflow-y: auto;

    @include large-down {
      height: auto;
      overflow-y: visible;
    }
  }

  &__row {
    display: flex;
    align-items: flex-end;
    gap: rem(8);
    width: 100%;
    padding: rem(8);
    border-radius: rem(8);
    border: 1px solid var(--color-grey-200);

    @include medium-down {
      flex-wrap: wrap;
      padding: rem(12);
    }

    &__select {
      flex: 2;

      @include medium-down {
        flex: 1 1 100%;
      }
    }

    &__quantity {
      flex: 1;

      @include medium-down {
        flex: 1 1 calc(100% - 50px);
      }
    }

    button {
      @include medium-down {
        flex-shrink: 0;
      }
    }
  }
}
</style>