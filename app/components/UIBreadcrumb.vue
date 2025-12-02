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
          <RouterLink :to="item.href" exact-active-class="ui-breadcrumb__active"><Icon v-if="item.icon" :name="item.icon" />{{ item.text }}</RouterLink>
        </template>
        <template v-else>
          <Icon v-if="item.icon" :name="item.icon" />
          <span :class="{ 'ui-breadcrumb__active': !item.href, 'ui-breadcrumb__disabled': item.disabled }">{{ item.text }}</span>
        </template>
        <Icon name="lucide:chevron-right" />
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
