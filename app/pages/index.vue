<script setup lang="ts">
import type { Homepage } from '~/types/sanity.types'

const homepage_query = groq`*[_type == "homepage"][0]{seoTitle, seoDescription, heroTitle, heroSubtitle, heroImage, contentTitle, content}`

const { data: homepage } = await useLazySanityQuery<Homepage>(homepage_query)

useSeoMeta({
  title: () => homepage.value?.seoTitle || 'Homepage',
  description: () => homepage.value?.seoDescription || 'Welcome to our recipe management app'
})
</script>

<template>
  <div>
    <HHero v-if="homepage" :title="homepage.heroTitle" :subtitle="homepage.heroSubtitle" :image="homepage.heroImage" />
    <HContentSectionList v-if="homepage?.content && homepage?.contentTitle" :content="homepage.content" :title="homepage.contentTitle" />
  </div>
</template>


