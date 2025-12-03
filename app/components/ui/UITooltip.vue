<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    orientation?: 'top' | 'bottom' | 'left' | 'right'
    content: string
    delay?: number
  }>(),
  {
    orientation: 'top',
    delay: 300
  }
)

const isVisible = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const handleMouseEnter = () => {
  timeoutId = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

const handleMouseLeave = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  isVisible.value = false
}
</script>

<template>
  <div 
    class="ui-tooltip" 
    :class="`-${orientation}`"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
    <span v-if="isVisible" class="ui-tooltip__content">{{ content }}</span>
  </div>
</template>

<style lang="scss">
.ui-tooltip {
  position: relative;
  display: inline-block;

  &__content {
    color: var(--color-white);
    background-color: var(--color-primary-500);
    padding: #{rem(6)} #{rem(8)};
    border-radius: #{rem(8)};
    font-size: #{rem(14)};
    position: absolute;
    white-space: nowrap;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      border-style: solid;
    }
  }

  &:hover &__content {
    opacity: 1;
  }

  &.-top &__content {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: #{rem(8)};

    &::after {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: #{rem(6)} #{rem(6)} 0 #{rem(6)};
      border-color: var(--color-primary-500) transparent transparent transparent;
    }
  }

  &.-bottom &__content {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: #{rem(8)};

    &::after {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 #{rem(6)} #{rem(6)} #{rem(6)};
      border-color: transparent transparent var(--color-primary-500) transparent;
    }
  }

  &.-left &__content {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: #{rem(8)};

    &::after {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: #{rem(6)} 0 #{rem(6)} #{rem(6)};
      border-color: transparent transparent transparent var(--color-primary-500);
    }
  }

  &.-right &__content {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: #{rem(8)};

    &::after {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: #{rem(6)} #{rem(6)} #{rem(6)} 0;
      border-color: transparent var(--color-primary-500) transparent transparent;
    }
  }
}
</style>
