<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

defineProps<{
  nav: SiteSettings['mainNavigation']
}>()

const isLoggedin = computed(() => useAuth().getUser() !== null)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const route = useRoute()
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  }
)
</script>

<template>
  <header class="m-header">
    <div class="m-header__wrapper">
      <nav class="m-header__content">
        <button class="m-header__burger" :class="{ 'is-open': isMenuOpen }" aria-label="Menu" @click="toggleMenu">
          <span />
          <span />
          <span />
        </button>

        <div class="m-header__nav" :class="{ 'is-open': isMenuOpen }">
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
        </div>

        <div v-if="isMenuOpen" class="m-header__overlay" @click="toggleMenu" />
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
  backdrop-filter: blur(rem(2));

  &__wrapper {
    border-radius: rem(12);
    background-color: var(--mheader-bg-color);
    border: 1.5px solid var(--mheader-border-color);
    color: var(--mheader-text-color);
    padding: rem(12);
    position: relative;
    margin: rem(12) rem(12) rem(12) rem(12);

    @include medium-down {
      margin: rem(12) rem(8) rem(0) rem(8);
      padding: rem(16);
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1500px;
    margin: 0 auto;
  }

  &__burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: rem(24);
    height: rem(18);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 110;

    span {
      display: block;
      width: 100%;
      height: rem(2);
      background-color: var(--mheader-text-color);
      border-radius: rem(2);
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &.is-open {
      span:nth-child(1) {
        transform: translateY(rem(8)) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(rem(-8)) rotate(-45deg);
      }
    }

    @include medium-down {
      display: flex;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @include medium-down {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      background-color: var(--mheader-bg-color);
      padding: rem(80) rem(24) rem(24);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 105;

      &.is-open {
        transform: translateX(0);
      }
    }
  }

  &__auth {
    display: flex;
    gap: rem(8);

    @include medium-down {
      flex-direction: column;
      margin-top: rem(24);
      padding-top: rem(24);
      border-top: 1px solid var(--mheader-border-color);
    }
  }

  &__overlay {
    display: none;

    @include medium-down {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 101;
    }
  }
}
</style>