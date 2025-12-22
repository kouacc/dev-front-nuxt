<script setup lang="ts">
import type { Homepage } from '~/types/sanity.types'

const props = defineProps<{
  title: NonNullable<Homepage['contentTitle']>,
  content: NonNullable<Homepage['content']>
}>()
</script>

<template>
  <div class="h-content-sl">
    <UITitle type="heading2" align="center" class="h-content-sl__title">{{ props.title }}</UITitle>
    <HContentSection
      v-for="(section, index) in props.content"
      :key="index"
      :content="section"
    />
  </div>
</template>

<style lang="scss">
.h-content-sl {
  margin-top: rem(48);

  &__title {
    margin-bottom: rem(32);
  }
}
</style>