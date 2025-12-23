<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

const props = defineProps<{
  menu: NonNullable<SiteSettings['footerNavigation']>[number]
}>()

</script>

<template>
  <nav class="m-footer-nav">
    <span class="m-footer-nav__title">{{ props.menu.title }}</span>
    <ul class="m-footer-nav__list">
      <li v-for="(i, index) in props.menu.items" :key="index" class="m-footer-nav__item">
        <NuxtLink class="m-footer-nav__link" :to="i.link">{{ i.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.m-footer-nav {
  flex-grow: 0;
  max-width: rem(300);

  &__title {
    display: block;
    font-weight: 600;
    margin-bottom: rem(8);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: rem(4);
  }

  &__link {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.1s ease-in-out;

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>