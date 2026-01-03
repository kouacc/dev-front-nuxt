<script setup lang="ts">
import type { LegalType } from '~/types/sanity.types'

const { slug } = useRoute().params

const query = groq`*[_id == $slug][0]`

const { data: page } = await useLazySanityQuery<LegalType>(query)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<template>
  <div>
    <UITitle>{{ page?.title }}</UITitle>
    <p>Dernière mise à jour : {{ page?.lastUpdated }}</p>
    <div class="wysiwyg p-legal-content">
      <SanityContent :value="page?.content" />
    </div>
  </div>
</template>

<style lang="scss">
.p-legal-content {
  margin-top: rem(32);
}
</style>