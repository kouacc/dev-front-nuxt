<script setup lang="ts">
import type { Homepage } from '~/types/sanity.types'

const homepage_query = groq`*[_type == "homepage"][0]{seoTitle, seoDescription, heroTitle, heroSubtitle, heroImage, content}`

const { data: homepage } = await useLazySanityQuery<Homepage>(homepage_query)

useSeoMeta({
  title: () => homepage.value?.seoTitle || 'Homepage',
  description: () => homepage.value?.seoDescription || 'Welcome to our recipe management app'
})
</script>

<template>
  <div>
    <div class="hero">
      <h1>{{ homepage?.heroTitle }}</h1>
      <p>{{ homepage?.heroSubtitle }}</p>
      <NuxtImg v-if="homepage?.heroImage" :src="useSanityImage(homepage?.heroImage)?.url()" />
    </div>
    <UITitle>Homepage</UITitle>
    <pre>{{ homepage }}</pre>
    <SanityContent v-for="(sec, index) in homepage?.content" :key="index" :value="sec.sectionBody"/>
    
  </div>
</template>

<style lang="scss">
.hero {
  border-radius: rem(24);
  width: 100%;
  height: rem(300);
  background-color: var(--color-grey-200);
}
</style>
