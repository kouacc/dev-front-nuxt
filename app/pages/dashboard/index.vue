<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'aside'
})

const { data } = await useAsyncData('my-recipes', () => {
  return $fetch('/recipes/my-recipes', {
    baseURL: useRuntimeConfig().public.apiUrl,
    headers: {
      Authorization: `Bearer ${useCookie('user-token').value}`
    }
  })
})
</script>

<template>
  <div>
    <UITitle>Dashboard</UITitle>
    <pre>{{ data }}</pre>
    <AddRecipeForm />
  </div>
</template>