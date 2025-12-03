<script setup lang="ts">
</script>

<template>
  <aside class="dh-sidebar">
    <SidebarLink to="/dashboard" label="My Recipes" icon="lucide:notebook-tabs" />
    <SidebarLink to="/dashboard/goals" label="My Goals" icon="target" />
    <SidebarLink to="/dashboard/settings" label="Settings" icon="settings" />
    <SidebarUser />
  </aside>
</template>

<style lang="scss">
.dh-sidebar {
  --dh-sidebar-bg-color: var(--color-primary-50);
  background-color: var(--dh-sidebar-bg-color);
  display: flex;
  flex-direction: column;

  border-right: 1.5px solid var(--color-primary-200);
  padding: rem(16);
}
</style>