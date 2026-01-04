<script setup lang="ts">
import type { Homepage } from '~/types/sanity.types'

const props = defineProps<{
  title: Homepage['heroTitle'],
  subtitle: Homepage['heroSubtitle'],
  image: Homepage['heroImage']
}>()

</script>


<template>
  <div class="hp-hero">
    <div class="hp-hero__content">
      <h1 class="hp-hero__title">{{ props.title }}</h1>
      <p class="hp-hero__subtitle">{{ props.subtitle }}</p>
    </div>
    <NuxtImg
      v-if="props.image"
      class="hp-hero__img"
      :src="useSanityImage(props.image)?.url()"
    />
  </div>
</template>

<style lang="scss">
.hp-hero {
  border-radius: rem(24);
  width: 100%;
  height: 70vh;
  position: relative;
  overflow: hidden;
  padding: rem(24);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
    color: #fff;
  }
  
  &__title {
      font-size: rem(96);
      margin: 0;
      text-align: center;
      font-family: 'Playfair Display', serif;
    }

  &__subtitle {
      font-size: rem(20);
      margin: rem(12) 0 0 0;
      text-align: center;
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