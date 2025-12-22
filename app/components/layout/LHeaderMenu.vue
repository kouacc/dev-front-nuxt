<script setup lang="ts">
import type { SiteSettings } from '~/types/sanity.types'

const props = defineProps<{
  nav: SiteSettings['mainNavigation'];
}>()

const MAX_VISIBLE_ITEMS = 5

const visibleItems = computed(
  () => props.nav?.slice(0, MAX_VISIBLE_ITEMS) ?? []
)
const hiddenItems = computed(() => props.nav?.slice(MAX_VISIBLE_ITEMS) ?? [])
const hasHiddenItems = computed(() => hiddenItems.value.length > 0)

const isSubmenuOpen = ref(false)
const submenuRef = ref<HTMLElement | null>(null)

const toggleSubmenu = () => {
  isSubmenuOpen.value = !isSubmenuOpen.value
}

useClickOutside(submenuRef, () => {
  isSubmenuOpen.value = false
})

const route = useRoute()
watch(
  () => route.path,
  () => {
    isSubmenuOpen.value = false
  }
)
</script>

<template>
  <ul class="m-header__menu">
    <LHeaderMenuItem
      v-for="(item, index) in visibleItems"
      :key="index"
      :label="item.label!"
      :link="item.link!"
    />

    <li v-if="hasHiddenItems" ref="submenuRef" class="m-header__menu__more">
      <button
        class="m-header__menu__more-btn"
        :class="{ 'is-open': isSubmenuOpen }"
        @click.stop="toggleSubmenu"
      >
        Plus
        <Icon
          name="lucide:chevron-down"
          class="m-header__menu__more-icon"
          size="16"
        />
      </button>

      <ul v-show="isSubmenuOpen" class="m-header__submenu">
        <LHeaderMenuItem
          v-for="(item, index) in hiddenItems"
          :key="`hidden-${index}`"
          :label="item.label!"
          :link="item.link!"
        />
      </ul>
    </li>
  </ul>
</template>

<style lang="scss">
.m-header__menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: rem(12);

  @include medium-down {
    flex-direction: column;
    gap: rem(4);
  }

  &__more {
    position: relative;
    display: flex;
    align-items: center;

    @include medium-down {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__more-btn {
    display: flex;
    align-items: center;
    gap: rem(4);
    font-weight: 600;
    color: var(--mheader-text-color);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: rem(8) rem(12);
    border-radius: rem(8);
    transition: background-color 0.1s ease-in-out;
    font-size: inherit;
    font-family: inherit;

    &:hover {
      background-color: var(--color-primary-100);
    }

    &.is-open .m-header__menu__more-icon {
      transform: rotate(180deg);
    }

    @include medium-down {
      width: 100%;
      padding: rem(12) rem(16);
      font-size: rem(18);
    }
  }

  &__more-icon {
    transition: transform 0.2s ease;
  }
}

.m-header__submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: rem(200);
  background-color: var(--mheader-bg-color);
  border: 1.5px solid var(--mheader-border-color);
  border-radius: rem(8);
  padding: rem(8);
  margin-top: rem(8);
  list-style: none;
  box-shadow: 0 rem(4) rem(12) rgba(0, 0, 0, 0.1);
  z-index: 120;

  @include medium-down {
    position: static;
    min-width: 100%;
    border: none;
    box-shadow: none;
    padding: 0;
    margin-top: 0;
    padding-left: rem(16);
    background: transparent;
  }
}
</style>
