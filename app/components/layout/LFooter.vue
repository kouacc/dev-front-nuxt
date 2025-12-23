<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

const props = defineProps<{
  nav: SiteSettings['footerNavigation'];
  description: SiteSettings['footerDescription'];
  img: SiteSettings['footerImg'];
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="m-footer">
    <div class="m-footer__top">
      <div class="m-footer__brand">
        <NuxtLink to="/" class="m-footer__logo">
          <NuxtImg v-if="props.img" :src="useSanityImage(props.img)?.url()" />
        </NuxtLink>
        <p v-if="props.description" class="m-footer__description">
          {{ props.description }}
        </p>
      </div>

      <div class="m-footer__navs">
        <LFooterNav v-for="(n, index) in props.nav" :key="index" :menu="n" />
      </div>
    </div>

    <div class="m-footer__bottom">
      <p class="m-footer__copyright">
        © {{ currentYear }} RecipeBook. Tous droits réservés.
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
.m-footer {
  margin-top: rem(60);
  padding: rem(20) 0;
  text-align: center;
  font-size: rem(14);
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-grey-200);
}
</style>