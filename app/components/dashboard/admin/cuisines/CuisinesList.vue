<script setup lang="ts">
const { data: cuisines } = await useAsyncData('cuisines', async () => {
  const { data } = await $fetch<APIResponse<Cuisine[]>>('/cuisines', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

const modalOpen = ref<boolean>(false)
const selectedModal = ref<'create' | 'update' | 'delete' | null>(null)

const selectedCuisine = ref<Cuisine | null>(null)

const openModal = (modalType: 'create' | 'update' | 'delete', cuisine?: Cuisine) => {
  selectedModal.value = modalType
  if (cuisine) {
    selectedCuisine.value = cuisine
  }
  modalOpen.value = true
}
</script>

<template>
  <div class="cuisines-list">
    <div class="cuisines-list__header">
      <UITitle>Gestion des cuisines</UITitle>
      <UIButton @click="openModal('create')">
        <Icon name="lucide:plus" /> Créer
      </UIButton>
    </div>

    <ul class="cuisines-list__items">
      <li v-for="cuisine in cuisines" :key="cuisine.cuisine_id" class="cuisines-list__item">
        <span class="cuisines-list__item-name">{{ cuisine.name }}</span>
        <div class="cuisines-list__item-actions">
          <UIButton variant="outline" size="small" @click="openModal('update', cuisine)">Modifier</UIButton>
          <UIButton variant="outline" size="small" variation="danger" @click="openModal('delete', cuisine)">Supprimer</UIButton>
        </div>
      </li>
    </ul>

    <template v-if="cuisines">
      <CreateCuisineModal v-if="selectedModal === 'create'" v-model:open="modalOpen" v-model:cuisines="cuisines" />
      <UpdateCuisineModal v-if="selectedModal === 'update' && selectedCuisine" v-model:open="modalOpen" v-model:cuisine="selectedCuisine" v-model:cuisines="cuisines" />
      <DeleteCuisineModal v-if="selectedModal === 'delete' && selectedCuisine" v-model:open="modalOpen" v-model:cuisine="selectedCuisine" v-model:cuisines="cuisines" />
    </template>
  </div>
</template>

<style lang="scss">
.cuisines-list {
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

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
  }

  &__item-name {
    font-weight: 500;
    color: var(--color-grey-800);
  }

  &__item-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
  }
}
</style>