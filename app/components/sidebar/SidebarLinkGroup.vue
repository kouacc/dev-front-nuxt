<script setup lang="ts">
defineProps<{
  links: { to: string; label: string; icon?: string }[];
}>()
</script>

<template>
  <nav class="sidebar-link-group">
    <ul>
      <li v-for="link in links" :key="link.to">
        <SidebarLink :to="link.to" :label="link.label" :icon="link.icon" />
      </li>
    </ul>
  </nav>
</template>
