<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'link'
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'default',
    size: 'medium',
    disabled: false,
  },
)

const renderedComponent = computed(() => {
  return props.type === 'link' ? 'a' : 'button'
})
</script>

<template>
  <component :is="renderedComponent" :class="['ui-btn', `-${props.variant}`, `-${props.size}`]" :disabled="props.disabled">
    <slot />
  </component>
</template>

<style lang="scss">
.ui-btn {
  --button-bg-color: var(--color-primary-500);
  --button-text-color: var(--color-white);
  --button-bg-hover: var(--color-primary-700);
  --button-bg-pressed: var(--color-primary-800);
  --button-bg-disabled: var(--color-grey-200);
  --button-text-disabled: var(--color-grey-400);
  --button-border-color: transparent;
  --button-ring-color: var(--color-primary-200);


  --button-border-radius: #{rem(12)};
  --button-padding-y: #{rem(12)};
  --button-padding-x: #{rem(16)};
  --button-font-size: #{rem(14)};

  --button-icon-size: #{rem(24)};


  border: none;
  display: inline-flex;
  gap: #{rem(8)};
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--button-font-size);

  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border-radius: var(--button-border-radius);
  border: 1.5px solid var(--button-border-color);
  padding: var(--button-padding-y) var(--button-padding-x);

  svg {
    width: var(--button-icon-size);
    height: var(--button-icon-size);
  }

  &:hover {
    background-color: var(--button-bg-hover);
    cursor: pointer;
  }

  &:focus {
    outline: 3px solid var(--button-ring-color);
  }

  &:active {
    background-color: var(--button-bg-pressed);
  }

  &:disabled {
    background-color: var(--button-bg-disabled);
    color: var(--button-text-disabled);
    cursor: not-allowed;
  }

  &.-outline {
    --button-bg-color: transparent;
    --button-border-color: var(--color-primary-500);
    --button-text-color: var(--color-primary-500);

    &:hover {
      --button-bg-hover: var(--color-primary-50);
    }

    &:active {
      --button-bg-pressed: var(--color-primary-100);
    }

    &:disabled {
      --button-bg-disabled: transparent;
      --button-border-color: var(--color-grey-200);
    }
  }

  &.-ghost {
    --button-bg-color: transparent;
    --button-border-color: transparent;
    --button-text-color: var(--color-primary-500);

    &:hover {
      --button-bg-hover: var(--color-primary-50);
    }

    &:active {
      --button-bg-pressed: var(--color-primary-100);
    }

    &:disabled {
      --button-bg-disabled: transparent;
      --button-border-color: transparent;
    }
  }

  &.-tiny {
    --button-padding-y: #{rem(6)};
    --button-padding-x: #{rem(8)};
    --button-font-size: #{rem(10)};
    --button-border-radius: #{rem(8)};
    --button-icon-size: #{rem(16)};
  }

  &.-small {
    --button-padding-y: #{rem(8)};
    --button-padding-x: #{rem(12)};
    --button-font-size: #{rem(12)};
    --button-border-radius: #{rem(8)};
  }

  &.-medium {
    --button-padding-y: #{rem(12)};
    --button-padding-x: #{rem(16)};
    --button-font-size: #{rem(14)};
  }

  &.-large {
    --button-padding-y: #{rem(14)};
    --button-padding-x: #{rem(20)};
    --button-font-size: #{rem(16)};
  }

  &.-giant {
    --button-padding-y: #{rem(16)};
    --button-padding-x: #{rem(24)};
    --button-font-size: #{rem(18)};
  }
}
</style>
