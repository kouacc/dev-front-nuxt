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
