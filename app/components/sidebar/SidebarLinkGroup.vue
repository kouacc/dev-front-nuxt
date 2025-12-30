<script setup lang="ts">
defineProps<{
  links: { to: string; label: string; icon?: string }[]
  label?: string
}>()
</script>

<template>
  <nav class="sidebar-link-group">
    <span v-if="label" class="sidebar-link-group__label">{{ label }}</span>
    <ul class="sidebar-link-group__list">
      <li v-for="link in links" :key="link.to" class="sidebar-link-group__list-item">
        <SidebarLink :to="link.to" :label="link.label" :icon="link.icon" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.sidebar-link-group {
  &__label {
    display: block;
    font-weight: 600;
    margin-bottom: rem(8);
    color: var(--color-grey-600);
    padding-left: rem(4);
  }
  
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