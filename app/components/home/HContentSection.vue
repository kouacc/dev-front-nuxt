<script setup lang="ts">
import type { Homepage } from '~/types/sanity.types'

const props = defineProps<{
  content: NonNullable<Homepage['content']>[number]
}>()

</script>

<template>
  <div class="h-section">
    <div class="h-section__content">
      <SanityContent :value="props.content.sectionBody" />
    </div>
    <!-- <NuxtImg v-if="props.content.sectionImage" class="h-section__img" :src="useSanityImage(props.content.sectionImage)?.url()" /> -->
    <NuxtImg class="h-section__img" src="https://placehold.co/600x400" />
  </div>
</template>
