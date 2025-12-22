<script setup lang="ts">
import type { Homepage } from '~/types/sanity.types'

const props = defineProps<{
  title: NonNullable<Homepage['contentTitle']>,
  content: NonNullable<Homepage['content']>
}>()
</script>

<template>
  <div>
    <UITitle type="heading2" >{{ props.title }}</UITitle>
    <HContentSection
      v-for="(section, index) in props.content"
      :key="index"
      :content="section"
    />
  </div>
</template>