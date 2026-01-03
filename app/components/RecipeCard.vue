<script setup lang="ts">
defineProps<{ recipe: Recipe }>()

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div class="recipe-card">
    <NuxtImg 
      v-if="!imageError"
      :src="'/recipes/' + recipe.image_url" 
      class="recipe-card__image"
      @error="handleImageError"
    />
    <div v-else class="recipe-card__placeholder">
      <Icon name="lucide:image" size="64" />
    </div>
    <div class="recipe-card__overlay">
      <p class="recipe-card__title">{{ recipe.title }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.recipe-card {
  position: relative;
  width: 100%;
  height: rem(300);
  border-radius: rem(12);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-gray-200);
    color: var(--color-gray-400);
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: rem(16);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    flex-direction: column;
    gap: rem(8);
    align-items: flex-start;
  }

  &__title {
    color: #ffffff;
    font-size: rem(18);
    font-weight: 600;
    margin: 0;
  }
}
</style>
