<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
    variant?: 'full' | 'outline'
    color?: 'default' | 'success' | 'error' | 'warning' | 'info'
    size?: 'medium' | 'large'
    label?: string
    helperText?: string
    type?: HTMLInputElement['type']
  }>(),
  {
    placeholder: '',
    disabled: false,
    color: 'default',
    variant: 'full',
    size: 'medium',
  },
)

const model = defineModel({ type: String, default: '' })
</script>

<template>
  <div :class="['ui-input', `-${props.color}`, `-${props.size}`, `-${props.variant}`]">
    <label v-if="props.label">{{ props.label }}</label>
    <input :placeholder="props.placeholder" :disabled="props.disabled" :type="props.type" v-model="model" />
    <span v-if="props.helperText">{{ props.helperText }}</span>
  </div>
</template>

<style lang="scss">
.ui-input {
  --input-bg-color: var(--color-grey-50);
  --input-text-color: var(--color-text);
  --input-border-color: var(--color-grey-200);
  --input-helper-text-color: var(--color-grey-500);

  --input-padding-x: #{rem(12)};
  --input-padding-y: #{rem(8)};
  --input-border-radius: #{rem(8)};
  --input-font-size: #{rem(14)};

  display: flex;
  flex-direction: column;

  > label {
    font-size: rem(16);
    font-weight: 500;
    margin-bottom: rem(8);
  }

  > input {
    background-color: var(--input-bg-color);
    color: var(--input-text-color);
    border: 1px solid var(--input-border-color);
    padding: var(--input-padding-y) var(--input-padding-x);
    border-radius: var(--input-border-radius);
    font-size: var(--input-font-size);

    &::placeholder {
      color: var(--color-grey-400);
    }

    &:hover {
      --input-border-color: var(--color-grey-400);
      --input-bg-color: var(--color-grey-100);
    }

    &:focus {
      outline: none;
      --input-border-color: var(--color-primary-500);
      --input-bg-color: var(--color-primary-50);
    }

    &:disabled {
      --input-bg-color: var(--color-grey-50);
      --input-border-color: var(--color-grey-200);
    }
  }

  > input:focus ~ span {
    color: var(--color-primary-500);
  }

  > span {
    margin-top: rem(4);
    font-size: rem(14);
    color: var(--color-grey-500);
  }

  &.-outline {
    --input-bg-color: transparent !important;

    > input {
      &:hover {
        --input-bg-color: transparent !important;
      }

      &:focus {
        --input-bg-color: transparent !important;
      }

      &:disabled {
        --input-bg-color: transparent !important;
      }
    }
  }

  &.-success {
    --input-bg-color: var(--color-green-50);
    --input-border-color: var(--color-green-500);
    --input-helper-text-color: var(--color-green-500);
  }

  &.-info {
    --input-bg-color: var(--color-blue-50);
    --input-border-color: var(--color-blue-500);
    --input-helper-text-color: var(--color-blue-500);
  }

  &.-warning {
    --input-bg-color: var(--color-yellow-50);
    --input-border-color: var(--color-yellow-500);
    --input-helper-text-color: var(--color-yellow-500);
  }

  &.-error {
    --input-bg-color: var(--color-red-50);
    --input-border-color: var(--color-red-500);
    --input-helper-text-color: var(--color-red-500);
  }

  &.-large {
    --input-padding-x: #{rem(12)};
    --input-padding-y: #{rem(12)};
    --input-font-size: #{rem(16)};
  }
}
</style>
