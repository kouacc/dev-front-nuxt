<script setup lang="ts">
const props = defineProps<{
  icon?: string
}>()
</script>

<template>
  <option class="ui-soption" v-bind="$attrs">
    <Icon v-if="props.icon" size="18" :name="props.icon"  />
    <slot />
  </option>
</template>

<style lang="scss">
.ui-soption {
  /* display: inline-flex; */
  justify-content: flex-start;
  gap: rem(16);
  padding: rem(6) rem(12);
  transition: 0.1s background-color;
  border-radius: #{rem(6)};

  &::checkmark {
    order: 1;
    margin-left: auto;
  }
}
</style>