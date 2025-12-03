<script setup lang="ts">
defineProps<{
  name: string;
  src?: string;
}>()
</script>

<template>
  <div class="ui-avatar">
    <NuxtImg v-if="src" :src="src" alt="Avatar" />
    <div v-else class="ui-avatar--placeholder">
      {{ name.slice(0, 2).toUpperCase() }}
    </div>
  </div>
</template>

<style lang="scss">
.ui-avatar {
  --avatar-bg-color: var(--color-primary-500);

  border-radius: rem(9999);
  width: rem(40);
  height: rem(40);
  object-fit: cover;
  background-color: var(--avatar-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;

  &--placeholder {
    font-weight: 600;
    font-size: rem(16);
    color: var(--color-white);
  }
}
</style>