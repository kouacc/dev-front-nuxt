<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

defineProps<{
  nav: SiteSettings['mainNavigation'];
}>()
</script>

<template>
  <ul class="m-header__menu">
    <LHeaderMenuItem
      v-for="(item, index) in nav"
      :key="index"
      :label="item.label!"
      :link="item.link!"
    />
  </ul>
</template>

<style lang="scss">
.m-header__menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: rem(12);

  @include medium-down {
    flex-direction: column;
    gap: rem(4);
  }
}
</style>
