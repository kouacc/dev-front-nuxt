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
