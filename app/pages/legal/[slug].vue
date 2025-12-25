<script setup lang="ts">
import type { LegalType } from '~/types/sanity.types'

const { slug } = useRoute().params

const query = groq`*[_id == "${slug}"][0]`

const { data: page } = await useLazySanityQuery<LegalType>(query)
</script>

<template>
  <div>
    <UITitle>{{ page?.title }}</UITitle>
    <p>Dernière mise à jour : {{ page?.lastUpdated }}</p>
    <SanityContent :value="page?.content" />
  </div>
</template>

<style lang="scss">

</style>