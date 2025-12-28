<script setup lang="ts">
const props = defineProps<{
  placeholder?: string
}>()

const model = defineModel({ type: String, default: '' })

</script>

<template>
  <select v-bind="$attrs" v-model="model" class="ui-select">
    <slot />
  </select>
</template>

<style lang="scss">
.ui-select {
  --select-text-color: var(--color-text);
  --select-bg-color: var(--color-white);
  --select-border-radius: #{rem(8)};
  --select-padding: #{rem(12)} #{rem(12)};

  color: var(--select-text-color);
  background-color: var(--select-bg-color);
  border-radius: var(--select-border-radius);
  padding: var(--select-padding);
}
</style>