<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
  layout: 'aside'
})

if (useRoute().path === '/dashboard/admin') {
  navigateTo('/dashboard/admin/cuisines')
}

</script>

<template>
  <div class="p-admin-wrapper">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.p-admin-wrapper {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>