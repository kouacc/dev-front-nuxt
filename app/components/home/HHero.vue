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
      <h1>{{ props.title }}</h1>
      <p>{{ props.subtitle }}</p>
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