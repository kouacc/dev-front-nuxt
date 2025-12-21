<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

defineProps<{
  nav: SiteSettings['mainNavigation']
}>()

const isLoggedin = computed(() => useAuth().getUser !== null)
</script>

<template>
  <header class="m-header">
    <nav>
      <ul>
        <li v-for="(l, index) in nav" :key="index">
          <NuxtLink :to="l.link" class="m-header__navlink">{{ l.label }}</NuxtLink>
        </li>
      </ul>
      <div class="m-header__auth">
        <template v-if="isLoggedin">
          <UIButton size="small" as="link" to="/dashboard">Mon dashboard</UIButton>
        </template>
        <template v-else>
          <UIButton size="small" as="link" to="/login" variant="ghost">Se connecter</UIButton>
          <UIButton size="small" as="link" to="/signup">Créer un compte</UIButton>
        </template>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
.m-header {
  --mheader-bg-color: var(--color-white);
  --mheader-border-color: var(--color-grey-300);
  --mheader-text-color: var(--color-text);

  background-color: var(--mheader-bg-color);
  border-bottom: 1.5px solid var(--mheader-border-color);
  color: var(--mheader-text-color);
  padding: rem(12);

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: rem(12);

    > li {
      display: flex;
      align-items: center;
    }
  }

  &__auth {
    display: flex;
    gap: rem(8);
  }

  &__navlink {
    font-weight: 600;
    color: var(--mheader-text-color);
    text-decoration: none;
    padding: rem(12) rem(18);
    border-radius: rem(9999);
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: var(--color-primary-100);
    }
  }
}
</style>