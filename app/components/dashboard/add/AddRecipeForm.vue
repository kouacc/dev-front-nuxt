<script setup lang="ts">
const props = defineProps<{
  mode: 'create' | 'edit',
  recipeData: FullRecipe | null
}>()

const toast = useToast()

interface AddRecipeForm {
  title: string
  description: string
  cuisine_id: number
  goal_id: number
}

const formContent = reactive<AddRecipeForm & { clear: () => void }>({
  title: '',
  description: '',
  cuisine_id: 1,
  goal_id: 1,
  clear (): void {
    this.title = ''
    this.description = ''
    this.cuisine_id = 1
    this.goal_id = 1
  }
})

const recipeId = defineModel<number | null>()

const [{ data: cuisines }, { data: goals }] = await Promise.all([
  useAsyncData('cuisines', async () => {
    const { data } = await $fetch<APIResponse<Cuisine[]>>('/cuisines', {
      baseURL: useRuntimeConfig().public.apiUrl
    })
    return data
  }),
  useAsyncData('goals', async () => {
    const data = await $fetch<Goal[]>('/goals', {
      baseURL: useRuntimeConfig().public.apiUrl
    })
    return data
  })
])

watch(() => props.recipeData, (data) => {
  if (data && cuisines.value && goals.value) {
    formContent.title = data.title
    formContent.description = data.description
    
    const cuisine = cuisines.value.find(c => c.name === data.cuisine_name)
    if (cuisine) {
      formContent.cuisine_id = cuisine.cuisine_id
    }
    
    const goal = goals.value.find(g => g.name === data.goal_name)
    if (goal) {
      formContent.goal_id = goal.goal_id
    }
  }
}, { immediate: true })


const onSubmit = async () => {
  if (recipeId.value !== null) {
    await $fetch(`/recipes/${recipeId.value}/title`, {
      method: 'PUT',
      baseURL: useRuntimeConfig().public.apiUrl,
      headers: {
        Authorization: `Bearer ${useCookie('user-token').value}`
      },
      body: {
        title: formContent.title
      },
      onResponse ({ response }) {
        if (response.status === 200) {
          toast.addToast({
            title: 'Recette modifiée',
            message: 'Votre recette a bien été modifiée.',
            type: 'success'
          })
        }
      }
    })
    return
  }

  await $fetch('/recipes', {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: formContent,
    onResponse ({ response }) {
      if (response.status === 201) {
        const data = response._data as APIResponse<{ recipe_id: number; title: string; description: string }>
        toast.addToast({
          title: 'Recette ajoutée',
          message: 'Votre recette a bien été ajoutée.',
          type: 'success'
        })

        formContent.title = data.data.title
        formContent.description = data.data.description
        recipeId.value = data.data.recipe_id
      }
    }
  })
}
</script>

<template>
  <form class="fr-createrecipe" @submit.prevent="onSubmit">
    <UITitle type="heading2">Informations</UITitle>
    <UIInput v-model="formContent.title" label="Titre" required />
    <UIInput v-model="formContent.description" label="Description" required :disabled="recipeId !== null" />
    <div class="fr-createrecipe__selects">
      <UISelect v-model="formContent.cuisine_id" required label="Cuisine" :disabled="recipeId !== null">
        <UISelectOption v-for="(cuisine, index) in cuisines" :key="index" :value="cuisine.cuisine_id">{{ cuisine.name }}</UISelectOption>
      </UISelect>
      <UISelect v-model="formContent.goal_id" required label="Goal" :disabled="recipeId !== null">
        <UISelectOption v-for="(goal, index) in goals" :key="index" :value="goal.goal_id">{{ goal.name }}</UISelectOption>
      </UISelect>
    </div>
    <UIButton as="button" type="submit">{{ recipeId ? 'Modifier' : 'Envoyer' }}</UIButton>
  </form>
</template>

<style lang="scss">
.fr-createrecipe {
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: rem(16);
  padding: rem(24);
  border-radius: rem(8);
  border: 1px solid var(--color-grey-200);
  flex-grow: 0;

  > *:not(button) {
    width: 100%;
  }

  &__selects {
    display: flex;
    gap: rem(16);

    > * {
      flex: 1;
    }
  }
}
</style>