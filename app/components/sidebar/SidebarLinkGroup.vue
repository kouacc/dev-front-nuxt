<script setup lang="ts">
defineProps<{
  links: { to: string; label: string; icon?: string }[];
}>()
</script>

<template>
  <nav class="sidebar-link-group">
    <ul class="sidebar-link-group__list">
      <li v-for="link in links" :key="link.to" class="sidebar-link-group__list-item">
        <SidebarLink :to="link.to" :label="link.label" :icon="link.icon" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.sidebar-link-group {
  
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block;
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-200);
    border-radius: rem(12);
    padding: rem(4);

    &-item {
      width: 100%;
      display: block;

    }
  }
}
</style>