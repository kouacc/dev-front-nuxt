<script setup lang="ts">
import type { UIToastProps } from '@/types/components'

withDefaults(defineProps<UIToastProps>(), {
  type: 'default',
  variant: 'solid',
})
</script>

<template>
  <div :class="['ui-toast', `-${type}`, `-${variant}`]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-check-icon lucide-check"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
    <div>
      <div class="ui-toast__content">
        <p>{{ title }}</p>
        <p>{{ message }}</p>
      </div>
      <div v-if="actionLeft || actionRight" class="ui-toast__buttons">
        <button
          v-if="actionLeft"
          :class="{ '-secondary': actionLeft.priority === 'secondary' }"
          @click="actionLeft?.callback"
        >
          {{ actionLeft?.label }}
        </button>
        <button
          v-if="actionRight"
          :class="{ '-secondary': actionRight.priority === 'secondary' }"
          @click="actionRight?.callback"
        >
          {{ actionRight?.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ui-toast {
  --toast-bg-color: var(--color-primary-500);
  --toast-border-color: transparent;
  --toast-text-color: var(--color-white);
  --toast-left-button-color: var(--color-white);
  --toast-right-button-color: var(--color-white);

  background-color: var(--toast-bg-color);
  color: var(--toast-text-color);
  border: 1px solid var(--toast-border-color);
  border-radius: rem(12);
  padding: rem(16);
  display: flex;
  gap: rem(16);
  max-width: rem(420);
  min-width: rem(300);

  &__content {
    gap: rem(16);

    &:has(+ .ui-toast__buttons) {
      margin-bottom: rem(16);
    }

    > p:first-child {
      font-weight: 600;
      margin-bottom: rem(4);
    }
  }

  &__buttons {
    display: inline-flex;
    gap: rem(16);

    > button {
      background: none;
      border: none;
      color: var(--toast-left-button-color);
      font-weight: 600;
      font-size: rem(16);
      padding: 0;
      cursor: pointer;

      &.-secondary {
        opacity: 0.6;
      }
    }
  }

  &.-outline {
    --toast-bg-color: var(--color-primary-50);
    --toast-border-color: var(--color-primary-500);
    --toast-text-color: var(--color-text);

    --toast-left-button-color: var(--color-primary-500);
    --toast-right-button-color: var(--color-grey-400);

    svg {
      stroke: var(--toast-border-color);
    }

    .ui-toast__content {
      > p:last-child {
        color: var(--color-grey-400);
      }
    }

    .ui-toast__buttons > button.-secondary {
      color: var(--toast-right-button-color);
      opacity: 1;
    }

    &.-success {
      --toast-bg-color: var(--color-green-50);
      --toast-border-color: var(--color-green-500);
      --toast-left-button-color: var(--color-green-500);
      --toast-right-button-color: var(--color-grey-400);
    }

    &.-info {
      --toast-bg-color: var(--color-blue-50);
      --toast-border-color: var(--color-blue-500);
      --toast-left-button-color: var(--color-blue-500);
      --toast-right-button-color: var(--color-grey-400);
    }

    &.-warning {
      --toast-bg-color: var(--color-yellow-50);
      --toast-border-color: var(--color-yellow-500);
      --toast-left-button-color: var(--color-yellow-500);
      --toast-right-button-color: var(--color-grey-400);
    }

    &.-error {
      --toast-bg-color: var(--color-red-50);
      --toast-border-color: var(--color-red-500);
      --toast-left-button-color: var(--color-red-500);
      --toast-right-button-color: var(--color-grey-400);
    }
  }

  &.-success {
    --toast-bg-color: var(--color-green-500);
    --toast-border-color: transparent;
  }

  &.-info {
    --toast-bg-color: var(--color-blue-500);
    --toast-border-color: transparent;
  }

  &.-warning {
    --toast-bg-color: var(--color-yellow-500);
    --toast-border-color: transparent;
  }

  &.-error {
    --toast-bg-color: var(--color-red-500);
    --toast-border-color: transparent;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
