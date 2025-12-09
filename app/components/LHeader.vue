<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

defineProps<{
  nav: SiteSettings['mainNavigation']
}>()
</script>

<template>
  <header>
    <nav>
      <ul>
        <li v-for="(l, index) in nav" :key="index">
          <NuxtLink :to="l.link">{{ l.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
