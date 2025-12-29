<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const open = defineModel<boolean>({ default: false });
</script>

<template>
    <div v-if="open" class="ui-modal">
        <div v-if="open" class="ui-modal-dialog">
          <div class="ui-modal-dialog__header">
            <UITitle type="heading2">{{ props.title }}</UITitle>
          </div>

          <div class="ui-modal-dialog__content">
            <slot name="content" />
          </div>
          <div class="ui-modal-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
    </div>
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
}
</style>
