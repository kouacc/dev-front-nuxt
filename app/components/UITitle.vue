<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  type?: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5'
}>(), {
  type: 'heading1',
})

const tag = computed(() => {
  switch (props.type) {
    case 'heading1':
      return 'h1';
    case 'heading2':
      return 'h2';
    case 'heading3':
      return 'h3';
    case 'heading4':
      return 'h4';
    case 'heading5':
      return 'h5';
    default:
      return 'h1';
  }
})
</script>

<template>
  <component :is="tag" class="ui-title">
    <slot />
  </component>
</template>


<style lang="scss" scoped>
.ui-title {
  font-weight: 600;
  color: var(--color-text);

  h1 & {
    font-size: #{rem(48)};
    line-height: #{rem(58)};
  }

  h2 & {
    font-size: #{rem(40)};
    line-height: #{rem(36)};
  }

  h3 & {
    font-size: #{rem(32)};
    line-height: #{rem(38)};
  }

  h4 & {
    font-size: #{rem(28)};
    line-height: #{rem(34)};
  }

  h5 & {
    font-size: #{rem(24)};
    line-height: #{rem(28)};
  }
}
</style>
