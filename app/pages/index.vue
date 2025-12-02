<script setup lang="ts">

const [{ data: recipes, error: recipesError }, { data: cuisines, error: cuisinesError }] = await Promise.all([
  useAsyncData('recipes', async () => {
    const { data } = await $fetch<APIResponse<FullRecipe[]>>('/recipes', {
      baseURL: useRuntimeConfig().public.apiUrl
    })
    return data
  }),
  useAsyncData('cuisines', async () => {
    const { data } = await $fetch<APIResponse<Cuisine[]>>('/cuisines', {
      baseURL: useRuntimeConfig().public.apiUrl
    })
    return data
  })
])

if (recipesError.value || cuisinesError.value) {
  throw createError({
    statusCode: recipesError.value?.statusCode || 500,
    statusMessage: recipesError.value?.statusMessage || 'Erreur lors du chargement des recettes.'
  })
}

const filters = ref<string[]>([])
const itemsPerPage = 2
const page = ref<number>(1)
const searchQuery = ref<string>('')

const filteredRecipes = computed<FullRecipe[]>(() => {
  let filtered = recipes.value || []
  
  if (filters.value.length > 0) {
    filtered = filtered.filter(recipe => filters.value.includes(recipe.cuisine_name))
  }

  const formattedSearch = searchQuery.value.trim().toLowerCase()
  if (formattedSearch.length > 0) {
    filtered = filtered.filter(recipe => {
      return recipe.title.toLowerCase().includes(formattedSearch)
    })
  }

  return filtered
})

const totalPages = computed<number>(() => {
  return Math.ceil(filteredRecipes.value.length / itemsPerPage)
})

const paginatedRecipes = computed<FullRecipe[]>(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredRecipes.value.slice(start, end)
})  

</script>

<template>
  <div>
    <div class="hero" />
    <UITitle>Homepage</UITitle>
    
  </div>
</template>

<style lang="scss">
.hero {
  border-radius: rem(24);
  width: 100%;
  height: rem(300);
  background-color: var(--color-grey-200);
}
</style>
