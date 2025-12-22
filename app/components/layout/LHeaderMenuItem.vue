<script setup lang="ts">
const props = defineProps<{
  label: string;
  link: string;
}>()
</script>

<template>
  <li class="m-header__menu__item">
    <NuxtLink :to="props.link" class="m-header__menu__item--link">{{ props.label }}</NuxtLink>
  </li>
</template>

<style lang="scss">
.m-header__menu__item {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &--link {
    font-weight: 600;
    color: var(--mheader-text-color);
    text-decoration: none;
    padding: rem(8) rem(12);
    border-radius: rem(8);
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: var(--color-primary-100);
    }

    @include medium-down {
      display: block;
      width: 100%;
      padding: rem(12) rem(16);
      font-size: rem(18);
    }
  }
}
</style>
