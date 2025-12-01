<script setup lang="ts">
const { toasts } = useToast()
</script>

<template>
  <div class="toast-provider">
    <slot />
    <div class="toast-container">
      <TransitionGroup name="toast">
        <UIToast
          v-for="toast in toasts"
          :id="toast.id"
          :key="toast.id"
          :title="toast.title"
          :message="toast.message"
          :type="toast.type"
          :variant="toast.variant"
          :icon="toast.icon"
          :action-left="toast.actionLeft"
          :action-right="toast.actionRight"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.toast-provider {
  position: relative;
  width: 100%;
  height: 100%;
}

.toast-container {
  position: fixed;
  top: rem(24);
  right: rem(24);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: rem(12);
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
}
</style>
