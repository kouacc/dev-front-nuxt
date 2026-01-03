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
  &__hamburger {
    display: none;
    position: fixed;
    top: rem(16);
    left: rem(16);
    z-index: 1001;
    background: var(--color-white);
    border: 1px solid var(--color-grey-200);
    border-radius: rem(8);
    padding: rem(8);
    cursor: pointer;
    transition: transform 0.2s ease;
    color: var(--color-text);

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    @include large-down {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__overlay {
    display: none;

    @include large-down {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      animation: fadeIn 0.2s ease;
    }
  }

  main {
    margin-left: rem(300);
    padding: rem(24);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @include large-down {
      margin-left: 0;
      padding: rem(64) rem(16) rem(16);
    }

    @include medium-down {
      padding: rem(60) rem(12) rem(12);
    }
  }

  aside {
    position: fixed;
    left: 0;
    top: 0;

    @include large-down {
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;

      &.is-open {
        transform: translateX(0);
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
