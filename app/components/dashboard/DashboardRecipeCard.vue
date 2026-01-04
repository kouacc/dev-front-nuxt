<script setup lang="ts">
defineProps<{
  recipe: Recipe
}>()

defineEmits<{
  delete: [recipe: Recipe]
}>()

const imageError = ref(false)

const onImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div class="recipe-card">
    <NuxtLink :to="{ name: 'recipes-id', params: { id: recipe.recipe_id } }" class="recipe-card__link">
      <div class="recipe-card__image-wrapper">
        <NuxtImg v-if="!imageError" :src="'/recipes/' + recipe.image_url" :alt="recipe.title" class="recipe-card__image" @error="onImageError" />
        <div v-if="imageError" class="recipe-card__image-placeholder">
          <Icon name="lucide:image" size="64" />
        </div>
      </div>

      <UITitle type="heading3" class="recipe-card__title">{{ recipe.title }}</UITitle>

      <div class="recipe-card__actions">
        <button class="recipe-card__btn" @click="$router.push({ name: 'dashboard-add-id', params: { id: recipe.recipe_id } })">
          <Icon name="lucide:edit" size="18" />
        </button>
        <button class="recipe-card__btn recipe-card__btn--delete" @click.prevent="$emit('delete', recipe)">
          <Icon name="lucide:trash" size="18" />
        </button>
      </div>

    </NuxtLink>
  </div>
</template>

<style lang="scss">
.recipe-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  padding: rem(12);

  &__link {
    text-decoration: none;

    > * + * {
      margin-top: rem(8);
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 60%;
    overflow: hidden;
    background-color: var(--color-gray-100);
    border-radius: rem(8);
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
   

  &__image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 3rem;
  } 
  }

  &__actions {
    display: flex;
    gap: rem(8);
  }

  &__btn {
    --btn-bg-color: transparent;
    --btn-hover-bg-color: var(--color-primary-100);
    --btn-text-color: var(--color-grey-600);

    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--btn-bg-color);
    cursor: pointer;
    padding: rem(8);
    border-radius: rem(8);
    color: var(--btn-text-color);
    transition: background-color 0.1s ease;

    &:hover {
      --btn-text-color: var(--color-primary-600);
      background-color: var(--btn-hover-bg-color);
    }

    &--delete {
      --btn-hover-bg-color: var(--color-red-100);

      &:hover {
        --btn-text-color: var(--color-red-600);
      }
    }
  }
}
</style>
