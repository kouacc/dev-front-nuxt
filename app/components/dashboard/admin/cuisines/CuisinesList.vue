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
  </div>
</template>
