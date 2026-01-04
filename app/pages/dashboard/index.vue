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

const showDeleteModal = ref(false)
const selectedRecipe = ref<Recipe | null>(null)

const handleDeleteClick = (recipe: Recipe) => {
  selectedRecipe.value = recipe
  showDeleteModal.value = true
}
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

    <DeleteRecipeModal
      v-if="selectedRecipe"
      v-model:open="showDeleteModal"
      v-model:recipes="recipes"
      v-model:recipe="selectedRecipe"
    />
  </div>
</template>
