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
    <div class="hp-hero">
      <div class="hp-hero__content">
        <h1>{{ homepage?.heroTitle }}</h1>
        <p>{{ homepage?.heroSubtitle }}</p>
      </div>
      <NuxtImg
        v-if="homepage?.heroImage"
        class="hp-hero__img"
        :src="useSanityImage(homepage?.heroImage)?.url()"
      />
    </div>
    <SanityContent
      v-for="(sec, index) in homepage?.content"
      :key="index"
      :value="sec.sectionBody"
    />
  </div>
</template>

<style lang="scss">
.hp-hero {
  border-radius: rem(24);
  width: 100%;
  height: rem(300);
  position: relative;
  overflow: hidden;
  padding: rem(24);

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  &__content {
    position: relative;
    z-index: 1;
    color: var(--color-white);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    display: block;
    }
}
</style>
