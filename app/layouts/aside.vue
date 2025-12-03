<template>
  <div class="ly-aside">
    <DashboardSidebar />
    <main class="ly-aside__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ly-aside {
    display: flex;
    flex-flow: row wrap;

    aside {
        flex: 1;
    }

    &__main {
        flex: 4;
    }
}
</style>