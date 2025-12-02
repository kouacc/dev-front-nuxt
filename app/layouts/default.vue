<template>
  <main class="container">
    <slot />
  </main>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

body {
  background-color: var(--color-primary-50);
  color: var(--color-text);
}
</style>