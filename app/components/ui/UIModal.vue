<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const open = defineModel<boolean>({ default: false });
</script>

<template>
  <Transition name="modal-overlay">
    <div v-if="open" class="ui-modal">
      <Transition>
        <div v-if="open" class="ui-modal-dialog">
          <div class="ui-modal-dialog__header">
            <UITitle type="heading2">{{ props.title }}</UITitle>
            <button class="ui-modal-dialog__close" @click="open = false">
              <Icon name="lucide:x" />
            </button>
          </div>

          <div class="ui-modal-dialog__content">
            <slot name="content" />
          </div>
          <div class="ui-modal-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style lang="scss">
.ui-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: rem(16);
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &-dialog {
    position: relative;
    background-color: var(--color-white);
    border-radius: rem(8);
    width: 100%;
    max-width: rem(500);
    max-height: calc(100vh - rem(32));
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin: auto;

    @include small-only {
      max-width: 100%;
      max-height: 100%;
      border-radius: 0;
      margin: 0;
    }

    &__header {
      padding: rem(16);
      border-bottom: 1px solid var(--color-grey-200);
      flex-shrink: 0;

      @include small-only {
        padding: rem(12);
      }
    }

    &__close {
      position: absolute;
      top: rem(16);
      right: rem(16);
      background: none;
      border: none;
      cursor: pointer;
      font-size: rem(16);
      color: var(--color-text);
      padding: rem(8);
      background-color: transparent;
      border-radius: rem(4);
      display: flex;
      z-index: 1;

      @include small-only {
        top: rem(8);
        right: rem(8);
      }

      &:hover {
        color: var(--color-primary);
        background-color: var(--color-grey-100);
      }
    }

    &__content {
      padding: rem(16);
      overflow-y: auto;
      flex: 1;

      @include small-only {
        padding: rem(12);
      }
    }

    &__footer {
      padding: rem(16);
      border-top: 1px solid var(--color-grey-200);
      text-align: right;
      flex-shrink: 0;
      display: flex;
      gap: rem(8);
      justify-content: flex-end;

      @include small-only {
        padding: rem(12);
        flex-direction: column;

      }
    }
  }
}

.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}
.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
