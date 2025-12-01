<script setup lang="ts">
import type { UIBreadcrumbItem } from '~/types/components'

defineProps<{
  items: UIBreadcrumbItem[];
}>()
</script>

<template>
  <nav class="ui-breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="index">
        <template v-if="item.href && !item.disabled">
          <RouterLink :to="item.href" exact-active-class="ui-breadcrumb__active">{{ item.text }}</RouterLink>
        </template>
        <template v-else>
          <span :class="{ 'ui-breadcrumb__active': !item.href, 'ui-breadcrumb__disabled': item.disabled }">{{ item.text }}</span>
        </template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss">
.ui-breadcrumb {
  --breadcrumb-bg-color: transparent;
  --breadcrumb-text-color: var(--color-grey-400);

  ol {
    list-style: none;
    display: flex;
    gap: #{rem(8)};

    li {
      display: flex;
      align-items: center;

      a, span {
        text-decoration: none;
        color: var(--breadcrumb-text-color);
        background-color: var(--breadcrumb-bg-color);
        padding: #{rem(12)} #{rem(8)};
        border-radius: #{rem(12)};

        &:hover {
          --breadcrumb-text-color: var(--color-grey-500);
          --breadcrumb-bg-color: var(--color-grey-100);
        }

        &:focus {
          outline: none;
          --breadcrumb-text-color: var(--color-primary-500);
          --breadcrumb-bg-color: var(--color-primary-50);
        }
      }

      svg {
        color: var(--color-grey-400);
      }
    }
  }
}

.ui-breadcrumb__active {
  color: var(--color-text) !important;
}

.ui-breadcrumb__disabled {
  color: var(--color-grey-400) !important;
}
</style>
