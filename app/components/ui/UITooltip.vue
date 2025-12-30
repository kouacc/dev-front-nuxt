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
const triggerRef = ref<HTMLElement | null>(null)
const tooltipPosition = ref({ top: '0px', left: '0px' })
let timeoutId: ReturnType<typeof setTimeout> | null = null

const calculatePosition = () => {
  if (!triggerRef.value) return

  const rect = triggerRef.value.getBoundingClientRect()
  const scrollX = window.scrollX
  const scrollY = window.scrollY
  const gap = 8

  switch (props.orientation) {
    case 'top':
      tooltipPosition.value = {
        top: `${rect.top + scrollY - gap}px`,
        left: `${rect.left + scrollX + rect.width / 2}px`
      }
      break
    case 'bottom':
      tooltipPosition.value = {
        top: `${rect.bottom + scrollY + gap}px`,
        left: `${rect.left + scrollX + rect.width / 2}px`
      }
      break
    case 'left':
      tooltipPosition.value = {
        top: `${rect.top + scrollY + rect.height / 2}px`,
        left: `${rect.left + scrollX - gap}px`
      }
      break
    case 'right':
      tooltipPosition.value = {
        top: `${rect.top + scrollY + rect.height / 2}px`,
        left: `${rect.right + scrollX + gap}px`
      }
      break
  }
}

const handleMouseEnter = () => {
  timeoutId = setTimeout(() => {
    calculatePosition()
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
    ref="triggerRef"
    class="ui-tooltip" 
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
    <Teleport to="body">
      <span 
        v-if="isVisible" 
        class="ui-tooltip__content"
        :class="`-${orientation}`"
        :style="{ top: tooltipPosition.top, left: tooltipPosition.left }"
      >
        {{ content }}
      </span>
    </Teleport>
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
    position: fixed;
    white-space: nowrap;
    z-index: 9999;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      border-style: solid;
    }

    &.-top {
      transform: translate(-50%, -100%);

      &::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: #{rem(6)} #{rem(6)} 0 #{rem(6)};
        border-color: var(--color-primary-500) transparent transparent transparent;
      }
    }

    &.-bottom {
      transform: translateX(-50%);

      &::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 #{rem(6)} #{rem(6)} #{rem(6)};
        border-color: transparent transparent var(--color-primary-500) transparent;
      }
    }

    &.-left {
      transform: translate(-100%, -50%);

      &::after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: #{rem(6)} 0 #{rem(6)} #{rem(6)};
        border-color: transparent transparent transparent var(--color-primary-500);
      }
    }

    &.-right {
      transform: translateY(-50%);

      &::after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: #{rem(6)} #{rem(6)} #{rem(6)} 0;
        border-color: transparent var(--color-primary-500) transparent transparent;
      }
    }
  }
}
</style>
