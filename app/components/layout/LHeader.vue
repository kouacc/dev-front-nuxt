<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

defineProps<{
  nav: SiteSettings['mainNavigation']
}>()

const isLoggedin = computed(() => useAuth().getUser() !== null)
</script>

<template>
  <header class="m-header">
    <div class="m-header__wrapper">
      <nav class="m-header__content">
        <LHeaderMenu v-if="nav" :nav="nav" />
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
    </div>
  </header>
</template>

<style lang="scss">
.m-header {
  --mheader-bg-color: var(--color-white);
  --mheader-border-color: var(--color-grey-200);
  --mheader-text-color: var(--color-text);

  
  position: fixed;
  top: 0;
  margin: 0;
  width: 100%;
  height: auto;
  z-index: 100;
  
  backdrop-filter: blur(rem(10));

  &__wrapper {
    border-radius: rem(12);
    background-color: var(--mheader-bg-color);
    border: 1.5px solid var(--mheader-border-color);
    color: var(--mheader-text-color);
    padding: rem(12);
    position: relative;
    margin: rem(12) rem(12) 0 rem(12);
  }
  

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1500px;
    margin: 0 auto;
  }

  

  &__auth {
    display: flex;
    gap: rem(8);
  }

  @include small-only {

  }
}
</style>