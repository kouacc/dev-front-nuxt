<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    pageAmount: number
    maxPages?: number
  }>(),
  {
    maxPages: 4
  }
)

const model = defineModel<number>('page', {
  default: 1
})

const renderedPages = computed(() => {
  const pages = []

  if (props.pageAmount <= props.maxPages) {
    for (let i = 1; i <= props.pageAmount; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, model.value - Math.floor(props.maxPages / 2))
    const end = Math.min(props.pageAmount, start + props.maxPages - 1)

    if (end - start < props.maxPages - 1) {
      start = Math.max(1, end - props.maxPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})
</script>

<template>
  <div class="ui-pagination">
    <button :disabled="model === 1" @click="model > 1 && model--">
      <Icon name="lucide:chevron-left" />
    </button>
    <button
      v-for="page in renderedPages"
      :key="page"
      :class="{ '-active': page === model }"
      @click="model = page"
    >
      {{ page }}
    </button>

    <button
      :disabled="model === pageAmount"
      @click="model < pageAmount && model++"
    >
      <Icon name="lucide:chevron-right" />
    </button>
  </div>
</template>

<style lang="scss">
.ui-pagination {
  --pagination-bg-color: transparent;
  --pagination-text-color: var(--color-primary-500);
  display: inline-flex;
  gap: rem(8);

  > button {
    border-radius: 9999px;
    padding: #{rem(12)};
    border: none;
    background-color: var(--pagination-bg-color);
    color: var(--pagination-text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: #{rem(48)};
    min-height: #{rem(48)};

    &:hover {
      --pagination-bg-color: var(--color-primary-50);
    }

    &:focus {
      outline: 3px solid var(--color-primary-200);
    }

    &.-active {
      background-color: var(--color-primary-500);
      color: var(--color-white);
    }
  }
}
</style>
