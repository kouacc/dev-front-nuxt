<script setup lang="ts">
import type { LegalType } from '~/types/sanity.types'

const { slug } = useRoute().params
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