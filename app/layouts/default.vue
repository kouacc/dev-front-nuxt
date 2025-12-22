
<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

const nav_query = groq`*[_type == "siteSettings"][0]{title, description, mainNavigation, footerNavigation}`

const { data: settings } = await useLazySanityQuery<SiteSettings>(nav_query)


useSeoMeta({
  title: () => settings?.value?.title || 'Recettes',
  description: () => settings?.value?.description || 'Manage your recipes and goals'
})
</script>

<template>
  <LHeader :nav="settings?.mainNavigation || []" />
  <main class="container">
    <slot />
  </main>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <LFooter :nav="settings?.footerNavigation" />
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  margin-top: rem(110);
}

body {
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
