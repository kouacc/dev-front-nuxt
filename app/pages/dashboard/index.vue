<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'aside'
})

const { data } = await useAsyncData<APIResponse<Recipe[]>>('my-recipes', () => {
  return $fetch('/recipes/my-recipes', {
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    }
  })
})

const recipes = ref<Recipe[]>(data.value?.data || [])

const currentPage = ref(1)
const itemsPerPage = 9
const totalPages = computed(() => Math.ceil(recipes.value.length / itemsPerPage))

const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return recipes.value.slice(start, end)
})
</script>

<template>
  <div class="p-dashboard">
    <div v-else class="p-dashboard__content">
      <div v-if="totalPages > 1" class="p-dashboard__pagination">
        <UIPagination
          v-model:page="currentPage"
          :page-amount="totalPages"
        />
      </div>
    </div>
  </div>
</template>
