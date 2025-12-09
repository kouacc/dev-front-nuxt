<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/settings'

defineProps<{
  nav: SanitySiteSettings['navigation'] | null;
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
