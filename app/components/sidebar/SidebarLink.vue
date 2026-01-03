<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

defineProps<{
  to: NuxtLinkProps['to']
  label: string;
  icon?: string;
}>()
</script>

<template>
  <NuxtLink :to="to" class="sidebar-link" active-class="sidebar-link--active">
    <Icon v-if="icon" :name="icon" />
    {{ label }}
  </NuxtLink>
</template>

<style lang="scss">
.sidebar-link {
  --sd-link-bg-color: transparent;
  --sd-link-text-color: var(--color-grey-800);
  --sd-link-hover: var(--color-primary-50);

  background-color: var(--sd-link-bg-color);
  color: var(--sd-link-text-color);
  text-decoration: none;
  display: block;
  padding: rem(12) rem(16);
  border-radius: rem(8);
  transition: background-color 0.1s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: rem(8);
  width: 100%;

  @include medium-down {
    padding: rem(10) rem(14);
    font-size: rem(14);
    gap: rem(6);
  }

  @include small-only {
    padding: rem(8) rem(12);
    font-size: rem(13);
  }

  &:hover {
    background-color: var(--sd-link-hover);
  }

  &--active {
    --sd-link-bg-color: var(--color-primary-100);
    --sd-link-text-color: var(--color-primary-700);
    font-weight: 600;
  }
}
</style>
