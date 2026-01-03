<script setup lang="ts">
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="ly-aside">
    <button class="ly-aside__hamburger" aria-label="Toggle menu" @click="toggleSidebar">
      <Icon :name="sidebarOpen ? 'lucide:x' : 'lucide:menu'" size="24" />
    </button>

    <div v-if="sidebarOpen" class="ly-aside__overlay" @click="closeSidebar" />

    <DashboardSidebar :is-open="sidebarOpen" @close="closeSidebar" />
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
