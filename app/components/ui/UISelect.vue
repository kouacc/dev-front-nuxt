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
  --select-border-color: var(--color-grey-200);

  color: var(--select-text-color);
  background-color: var(--select-bg-color);
  border: 1px solid var(--select-border-color);
  border-radius: var(--select-border-radius);
  padding: var(--select-padding);
  appearance: base-select;
  transition: 0.4s;
  min-width: #{rem(200)};

  &::picker(select) {
    appearance: base-select;
    border-radius: var(--select-border-radius);
    background-color: var(--select-bg-color);
    color: var(--select-text-color);
    border: 1px solid var(--select-border-color);

  }
}
</style>