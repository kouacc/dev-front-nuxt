<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    position?: 'left' | 'right'
    disabled?: boolean
    indeterminate?: boolean
  }>(),
  {
    position: 'right',
    disabled: false,
    indeterminate: false,
  }
)

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <div class="ui-checkbox">
    <label v-if="position === 'left'">
      {{ label }}
    </label>
    <input
      type="checkbox"
      v-model="model"
      :disabled="disabled"
      :indeterminate="indeterminate"
    />
    <label v-if="position === 'right'">
      {{ label }}
    </label>
  </div>
</template>

<style lang="scss">
.ui-checkbox {
  --checkbox-border-color: var(--color-primary-500);
  --checkbox-bg-color: transparent;
  display: inline-flex;
  gap: rem(16);


  > input[type="checkbox"] {
    border: 1.5px solid var(--checkbox-border-color);
    background-color: var(--checkbox-bg-color);
    width: rem(24);
    height: rem(24);
    border-radius: rem(8);
    accent-color: var(--color-primary-500);
    appearance: none;

    &:focus {
      outline: 2px solid var(--color-primary-100);
      outline-offset: 0px;
    }

    &:hover {
      --checkbox-bg-color: var(--color-primary-50);
    }

    &:checked {
      --checkbox-bg-color: var(--color-primary-500);
      --checkbox-border-color: var(--color-primary-500);
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGVjay1pY29uIGx1Y2lkZS1jaGVjayI+PHBhdGggZD0iTTIwIDYgOSAxN2wtNS01Ii8+PC9zdmc+');
      background-repeat: no-repeat;
      background-position: center;
    }

    &:indeterminate {
      --checkbox-bg-color: var(--color-primary-500);
      --checkbox-border-color: var(--color-primary-500);
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1taW51cy1pY29uIGx1Y2lkZS1taW51cyI+PHBhdGggZD0iTTE4IDEySDYiLz48L3N2Zz4=');
      background-repeat: no-repeat;
      background-position: center;
    }

    &:disabled {
      --checkbox-border-color: var(--color-grey-200);
      cursor: not-allowed;
    }
  }
}
</style>
