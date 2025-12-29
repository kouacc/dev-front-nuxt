<script setup lang="ts">
interface SelectProps {
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  autofocus?: boolean;
  size?: 'medium' | 'large';
  anchor?: 'top' | 'bottom' | 'left' | 'right';
}

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'medium',
  anchor: 'bottom',
  placeholder: undefined,
  name: undefined
})

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <select v-bind="props" v-model="model" class="ui-select" :size="props.multiple ? 1 : undefined">
    <UISelectOption v-if="props.placeholder" value="" disabled>{{ props.placeholder }}</UISelectOption>
    <slot />
  </select>
</template>

<style lang="scss">
.ui-select {
  --select-text-color: var(--color-text);
  --select-bg-color: var(--color-white);
  --select-border-radius: #{rem(8)};
  --select-padding-x: #{rem(12)};
  --select-padding-y: #{rem(8)};
  --select-font-size: #{rem(14)};
  --select-border-color: var(--color-grey-200);
  --select-picker-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93bi1pY29uIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==');

  color: var(--select-text-color);
  background-color: var(--select-bg-color);
  border: 1px solid var(--select-border-color);
  border-radius: var(--select-border-radius);
  padding: var(--select-padding-y) var(--select-padding-x);
  font-size: var(--select-font-size);
  appearance: base-select;
  transition: 0.4s;
  min-width: #{rem(200)};

  &[multiple] {
    appearance: menulist-button;
  }

  &::picker(select) {
    appearance: base-select;
    border-radius: var(--select-border-radius);
    background-color: var(--select-bg-color);
    color: var(--select-text-color);
    border: 1px solid var(--select-border-color);
    padding: #{rem(4)} #{rem(4)};
  }

    top: calc(anchor(bottom) + 2px);
    padding: #{rem(4)} #{rem(4)};
  }

  &::picker-icon {
    transition: 0.4s rotate;
    content: var(--select-picker-icon);
    width: #{rem(24)};
    height: #{rem(24)};

    @include dark-mode {
      --select-picker-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24taWNvbiBsdWNpZGUtY2hldnJvbi1kb3duIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=');
    }
  }

  &:open::picker-icon {
    --select-picker-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tdXAtaWNvbiBsdWNpZGUtY2hldnJvbi11cCI+PHBhdGggZD0ibTE4IDE1LTYtNi02IDYiLz48L3N2Zz4=');

    @include dark-mode {
      --select-picker-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLXVwLWljb24gbHVjaWRlLWNoZXZyb24tdXAiPjxwYXRoIGQ9Im0xOCAxNS02LTYtNiA2Ii8+PC9zdmc+')
    }
  }

  &.-large {
    --select-padding-x: #{rem(12)};
    --select-padding-y: #{rem(12)};
    --select-font-size: #{rem(16)};
  }
}
</style>