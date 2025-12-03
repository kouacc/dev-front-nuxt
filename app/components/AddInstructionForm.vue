<script setup lang="ts">
const props = defineProps<{
  recipeId: string
}>()

const toast = useToast()

const instructions = ref<{ step: number; description: string }[]>([
  { step: 1, description: '' }
])

const addInstruction = () => {
  instructions.value.push({
    step: instructions.value.length + 1,
    description: ''
  })
}

const deleteInstruction = (step: number) => {
  instructions.value = instructions.value.filter(i => i.step !== step)
  instructions.value.forEach((i, index) => {
    i.step = index + 1
  })
}

const onSubmit = async () => {
  await $fetch(`/recipes/${props.recipeId}/steps`, {
    method: 'POST',
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    },
    body: instructions.value, 
    onResponse ({ response }) {
      if (response.status !== 201) {
        toast.addToast({
          title: 'Erreur',
          message: 'Une erreur est survenue lors de l\'ajout des instructions.',
          type: 'error'
        })
      }
      toast.addToast({
        title: 'Instructions ajoutées',
        message: 'Les instructions ont bien été ajoutées à la recette.',
        type: 'success'
      })
    }
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIButton type="button" size="small" @click="addInstruction">Ajouter une instruction</UIButton>
    <div v-for="i in instructions" :key="i.step">
      <UIInput v-model="i.description" :label="`Étape ${i.step}`" :required="i.step === 1" />
      <UIButton type="button" size="small" variant="ghost" :disabled="i.step === 1" @click="deleteInstruction(i.step)">Supprimer l'instruction</UIButton>
    </div>
    <UIButton as="button" type="submit">Envoyer</UIButton>
  </form>
</template>