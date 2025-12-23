<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

const props = defineProps<{
  menu: NonNullable<SiteSettings['footerNavigation']>[number]
}>()

</script>

<template>
  <nav class="m-footer-nav">
    <span class="m-footer-nav__title">{{ props.menu.title }}</span>
    <ul class="m-footer-nav__list">
      <li v-for="(i, index) in props.menu.items" :key="index" class="m-footer-nav__item">
        <NuxtLink class="m-footer-nav__link" :to="i.link">{{ i.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
