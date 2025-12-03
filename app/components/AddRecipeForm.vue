<script setup lang="ts">
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

const { data: cuisines } = await useAsyncData('cuisines', async () => {
  const { data } = await $fetch<APIResponse<Cuisine[]>>('/cuisines', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})

// PAS D'ENDPOINT POUR LES GOALS
/* const { data: goals } = await useAsyncData('goals', async () => {
  const { data } = await $fetch<APIResponse<Goal[]>>('/goals')
}) */

const onSubmit = async () => {
  await $fetch('/recipes', {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: formContent,
    onResponse ({ response }) {
      if (response.status === 201) {
        toast.addToast({
          title: 'Recette ajoutée',
          message: 'Votre recette a bien été ajoutée.',
          type: 'success'
        })
        formContent.clear()
      }
    }
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIInput v-model="formContent.title" label="Titre" required />
    <UIInput v-model="formContent.description" label="Description" required />
    <select v-model="formContent.cuisine_id" required>
      <option v-for="(cuisine, index) in cuisines" :key="index" :value="cuisine.cuisine_id">{{ cuisine.name }}</option>
    </select>
    <button type="submit">Envoyer</button>
  </form>
</template> 