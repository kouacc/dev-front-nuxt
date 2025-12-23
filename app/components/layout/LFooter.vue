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
  font-size: rem(14);
  color: var(--color-text-secondary);
  background-color: var(--color-grey-50);

  &__top {
    display: flex;
    flex-wrap: wrap;
    gap: rem(48);
    padding: rem(48) rem(80);
    border-top: 1px solid var(--color-grey-200);

    @include medium-down {
      flex-direction: column;
      padding: rem(32) rem(24);
      gap: rem(32);
    }
  }

  &__brand {
    flex: 0 0 rem(280);
    max-width: rem(320);

    @include medium-down {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }

  &__logo {
    display: inline-block;
    text-decoration: none;
    margin-bottom: rem(16);
  }

  &__description {
    margin: 0 0 rem(20);
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  &__navs {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    gap: rem(32);
    justify-content: flex-end;

    @include medium-down {
      justify-content: flex-start;
    }
  }

  &__bottom {
    padding: rem(20) rem(80);
    border-top: 1px solid var(--color-grey-200);
    background-color: var(--color-white);
    text-align: center;

    @include medium-down {
      padding: rem(20) rem(24);
    }
  }

  &__copyright {
    margin: 0;
    color: var(--color-text-tertiary);
  }
}
</style>
