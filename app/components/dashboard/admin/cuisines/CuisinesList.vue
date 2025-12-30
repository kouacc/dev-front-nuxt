<script setup lang="ts">
const { data: cuisines } = await useAsyncData('cuisines', async () => {
  const { data } = await $fetch<APIResponse<Cuisine[]>>('/cuisines', {
    baseURL: useRuntimeConfig().public.apiUrl
  })
  return data
})
</script>
<template>
  <div class="cuisines-list">
  </div>
</template>
