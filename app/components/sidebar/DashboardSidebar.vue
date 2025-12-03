<script setup lang="ts">
const nav = [
  { to: '/dashboard', label: 'My Recipes', icon: 'lucide:notebook-tabs' },
  { to: '/dashboard/goals', label: 'My Goals', icon: 'lucide:target' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'lucide:settings' }
]
</script>

<template>
  <aside class="dh-sidebar">
    <SidebarLinkGroup :links="nav" />
    <SidebarUser />
  </aside>
</template>

<style lang="scss">
.dh-sidebar {
  --dh-sidebar-bg-color: var(--color-primary-50);
  background-color: var(--dh-sidebar-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100%;
  height: 100%;
  max-width: rem(300);
  width: 100%;

  border-right: 1.5px solid var(--color-primary-200);
  padding: rem(24);
}
</style>