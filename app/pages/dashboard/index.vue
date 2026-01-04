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

watch(data, (newData) => {
  if (newData?.data) {
    recipes.value = newData.data
  }
})
</script>

<template>
  <div class="p-dashboard">
    <div class="p-dashboard__header">
      <UITitle>Mes recettes</UITitle>
      <UIButton as="link" :to="'/dashboard/add'" variant="default">
        <Icon name="lucide:plus" />
        Créer une recette
      </UIButton>
    </div>

    <div v-if="recipes.length === 0" class="p-dashboard__empty">
      <Icon name="lucide:chef-hat" class="p-dashboard__empty-icon" />
      <p class="p-dashboard__empty-text">Vous n'avez pas encore créé de recettes</p>
      <UIButton as="link" :to="'/dashboard/add'" variant="default">
        Créer ma première recette
      </UIButton>
    </div>

    <div v-else class="p-dashboard__content">
      <div class="p-dashboard__grid">
        <DashboardRecipeCard
          v-for="recipe in paginatedRecipes"
          :key="recipe.recipe_id"
          :recipe="recipe"
          @delete="handleDeleteClick"
        />
      </div>

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

<style lang="scss">
.p-dashboard {
  &__grid {
    display: grid;
    gap: rem(24);
    grid-template-columns: 1fr;

    @include medium-up {
      grid-template-columns: repeat(2, 1fr);
    }

    @include large-up {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: rem(16);
  }
}
</style>