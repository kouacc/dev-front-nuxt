<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

const props = defineProps<{
  nav: SiteSettings['footerNavigation'];
  description: SiteSettings['footerDescription'];
  img: SiteSettings['footerImg'];
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="m-footer">
    <LFooterNav v-for="(n, index) in props.nav" :key="index" :menu="n" />
  </footer>
</template>

<style lang="scss">
.m-footer {
  margin-top: rem(60);
  padding: rem(20) 0;
  text-align: center;
  font-size: rem(14);
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-grey-200);
}
</style>