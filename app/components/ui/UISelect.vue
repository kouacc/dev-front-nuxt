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
  --select-picker-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93bi1pY29uIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==');

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

  &::picker-icon {
    transition: 0.4s rotate;
    content: var(--select-picker-icon);
    width: #{rem(24)};
    height: #{rem(24)};
  }
  }
}
</style>