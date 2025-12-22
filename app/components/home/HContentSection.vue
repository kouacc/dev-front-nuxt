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

<style lang="scss">
.h-section {
  margin-bottom: rem(24);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
  border-radius: rem(16);
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  @include medium-down {
    flex-direction: column;
  }

  &__content {
    padding: rem(24);
    flex: 1;
  }

  &__img {
    width: rem(200);
    object-fit: cover;
  }
}
</style>