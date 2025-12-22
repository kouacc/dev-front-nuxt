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
}
</style>
