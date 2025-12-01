<script setup lang="ts">
const { slug } = useRoute().params 
</script>

<template>
  <div>
    <h1>Article {{ slug }}</h1>
  </div>
</template>