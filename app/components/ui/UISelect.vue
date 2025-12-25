<script setup lang="ts">
const model = defineModel({ type: String, default: '' })
</script>

<template>
  <select v-bind="$attrs" v-model="model">
    <slot />
  </select>
</template>