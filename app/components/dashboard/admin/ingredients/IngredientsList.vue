<script setup lang="ts">
const { data: ingredients } = await useAsyncData('ingredients', async () => {
  const { data } = await $fetch<APIResponse<Ingredient[]>>('/ingredients', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

const modalOpen = ref<boolean>(false)
const selectedModal = ref<'create' | 'update' | 'delete' | null>(null)

const selectedIngredient = ref<Ingredient | null>(null)

const openModal = (
  modalType: 'create' | 'update' | 'delete',
  ingredient?: Ingredient
) => {
  selectedModal.value = modalType
  if (ingredient) {
    selectedIngredient.value = ingredient
  }
  modalOpen.value = true
}
</script>

<template>
  <div class="ingredients-list">
    <div class="ingredients-list__header">
      <UITitle>Gestion des ingrédients</UITitle>
      <UIButton @click="openModal('create')">
        <Icon name="lucide:plus" /> Créer
      </UIButton>
    </div>

    <ul class="ingredients-list__items">
      <li v-for="ingredient in ingredients" :key="ingredient.ingredient_id" class="ingredients-list__item">
        <span class="ingredients-list__item-name">{{ ingredient.name }}</span>
        <div class="ingredients-list__item-actions">
          <UIButton variant="outline" size="small" @click="openModal('update', ingredient)">Modifier</UIButton>
          <UIButton variant="outline" size="small" variation="danger" @click="openModal('delete', ingredient)">Supprimer</UIButton>
        </div>
      </li>
    </ul>

    <template v-if="ingredients">
      <NewIngredientModal v-if="selectedModal === 'create'" v-model:open="modalOpen" v-model:ingredients="ingredients" />
      <UpdateIngredientModal v-if="selectedModal === 'update' && selectedIngredient" v-model:open="modalOpen" v-model:ingredient="selectedIngredient" v-model:ingredients="ingredients" />
      <DeleteIngredientModal v-if="selectedModal === 'delete' && selectedIngredient" v-model:open="modalOpen" v-model:ingredient="selectedIngredient" v-model:ingredients="ingredients"/>
    </template>
  </div>
</template>

<style lang="scss">
.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @include medium-down {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-200);
    border-radius: 0.5rem;
    transition: box-shadow 0.2s ease;

    @include medium-down {
      flex-direction: column;
      align-items: flex-start;
      padding: 0.875rem 1rem;
      gap: 0.75rem;
    }

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
  }

  &__item-name {
    font-weight: 500;
    color: var(--color-grey-800);

    @include medium-down {
      width: 100%;
    }
  }

  &__item-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;

    @include medium-down {
      width: 100%;

      button {
        flex: 1;
      }
    }
  }
}
</style>
