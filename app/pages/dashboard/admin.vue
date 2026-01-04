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
    <AdminTabBar />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.p-admin-wrapper {
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @include medium-down {
    padding: 1rem;
  }

  @include small-only {
    padding: 0.75rem;
  }
}
</style>