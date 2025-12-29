<template>
  <div class="ly-aside">
    <DashboardSidebar />
    <main class="ly-aside__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.ly-aside {
  main {
    margin-left: rem(300);
    padding: rem(24);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  aside {
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
