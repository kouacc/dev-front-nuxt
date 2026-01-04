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
    </NuxtLink>
  </div>
</template>
