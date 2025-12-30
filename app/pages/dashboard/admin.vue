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
  </div>
</template>
