<script setup lang="ts">
const model = defineModel({ type: String, default: '' })
</script>

<template>
  <select v-bind="$attrs" v-model="model" class="ui-select">
    <slot />
  </select>
</template>