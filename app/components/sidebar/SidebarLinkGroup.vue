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

<style lang="scss">
.sidebar-link-group {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block;
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-200);
    border-radius: rem(12);
    padding: rem(4);

    > li {
      width: 100%;
      display: block;

    }
  }
}
</style>