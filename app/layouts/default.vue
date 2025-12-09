<script setup lang="ts">
const nav_query = groq`*[_type == "siteSettings"][0]{title, description, mainNavigation}`

const { data: settings } = await useLazySanityQuery<SanitySiteSettings>(nav_query)


useSeoMeta({
  title: () => settings?.value?.title || 'Recettes',
  description: () => settings?.value?.description || 'Manage your recipes and goals'
})
</script>

<template>
  <LHeader :nav="settings?.mainNavigation" />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <main class="container">
    <slot />
  </main>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

body {
  background-color: var(--color-primary-50);
  color: var(--color-text);
}
</style>
