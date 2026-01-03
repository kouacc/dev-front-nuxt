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

const filters = ref<string>('')
const itemsPerPage = 6
const page = ref<number>(1)
const searchQuery = ref<string>('')

const filteredRecipes = computed<FullRecipe[]>(() => {
  let filtered = recipes.value || []
  
  if (filters.value) {
    filtered = filtered.filter(recipe => recipe.cuisine_name === filters.value)
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
  <div class="p-recipes">
    <div class="p-recipes__filters">
      <UITitle type="heading2">Filtres</UITitle>
      <UIInput v-model="searchQuery" label="Rechercher une recette" placeholder="Ex: Poulet au curry" />
      <UISelect v-model="filters" label="Cuisine" placeholder="Sélectionner une cuisine">
        <UISelectOption v-for="(cuisine, index) in cuisines" :key="index" :value="cuisine.name" :label="cuisine.name" />
      </UISelect>
    </div>
    <div class="p-recipes__content">
      <ul v-if="paginatedRecipes.length > 0" class="p-recipes__list">
        <li v-for="recipe in paginatedRecipes" :key="recipe.recipe_id">
          <RecipeCard :recipe="recipe" />
        </li>
      </ul>
      <div v-else class="p-recipes__empty">
        <p>Aucune recette ne correspond à vos critères de recherche.</p>
      </div>
      <UIPagination v-if="paginatedRecipes.length > 0" v-model:page="page" class="p-recipes__pagination" :page-amount="totalPages" />
    </div>
  </div>
</template>

<style lang="scss">
.p-recipes {
  display: grid;
  gap: rem(24);
  grid-template-columns: 1fr 3fr;

  &__filters {
    background-color: var(--color-white);
    border-radius: rem(12);
    padding: rem(16);
    align-self: start;

    > * + * {
      margin-top: rem(16);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(24);
  }

  &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(rem(280), 1fr));
      gap: rem(24);
      padding: 0;
      margin: 0;
      list-style: none;
  }

  &__empty {
    background-color: var(--color-white);
    border-radius: rem(12);
    padding: rem(48) rem(24);
    text-align: center;
    color: var(--color-gray-600);
    font-size: rem(16);
  }

  &__pagination {
    align-self: center;
  }
}
</style>
