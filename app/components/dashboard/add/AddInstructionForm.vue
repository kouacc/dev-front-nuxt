<script setup lang="ts">
const props = defineProps<{
  recipeId: number | null,
  mode: 'create' | 'edit',
  recipeData: FullRecipe | null
}>()

const toast = useToast()

const instructions = ref<{ step: number; description: string }[]>([
  { step: 1, description: '' }
])

watch(() => props.recipeData, (data) => {
  if (data && data.instructions && data.instructions.length > 0) {
    instructions.value = data.instructions.map(inst => ({
      step: inst.step_number,
      description: inst.description
    }))
  }
}, { immediate: true })


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
  <form class="fr-addinstruction" @submit.prevent="onSubmit">
    <div class="fr-addinstruction__title">
      <UITitle type="heading2">Instructions</UITitle>
      <UIButton type="button" size="small" @click="addInstruction"><Icon name="lucide:plus" />Ajouter</UIButton>
    </div>
    <ul class="fr-addinstruction__list">
      <li v-for="i in instructions" :key="i.step" class="fr-addinstruction__instruction">
        <span class="fr-addinstruction__instruction__stepn">{{ i.step }}</span>
        <UIInput v-model="i.description" class="fr-addinstruction__instruction__input" :required="i.step === 1" />
        <UIButton type="button" size="small" variant="ghost" :disabled="i.step === 1" @click="deleteInstruction(i.step)">
          <Icon name="lucide:x" />
        </UIButton>
      </li>
    </ul>
    <UIButton v-if="props.recipeId" as="button" type="submit">Envoyer</UIButton>
    <UITooltip v-else orientation="left" content="Merci de compléter et d'envoyer la recette avant les instructions">
      <UIButton as="button" type="submit" disabled>Envoyer</UIButton>
    </UITooltip>
  </form>
</template>

<style lang="scss">
.fr-addinstruction {
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: rem(16);
  padding: rem(24);
  border-radius: rem(8);
  border: 1px solid var(--color-grey-200);
  height: 100%;

  > *:not(button, .ui-tooltip) {
    width: 100%;
  }

  &__title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: rem(8);
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  &__instruction {
    display: flex;
    align-items: center;
    gap: rem(8);
    width: 100%;
    padding: rem(8);
    border-radius: rem(8);
    border: 1px solid var(--color-grey-200);

    &__stepn {
      font-size: rem(12);
      width: rem(32);
      height: rem(32);
      display: grid;
      place-items: center;
      background-color: var(--color-primary-100);
      border-radius: 50%;
    }

    &__input {
      flex-grow: 1;
    }
  }
}
</style>