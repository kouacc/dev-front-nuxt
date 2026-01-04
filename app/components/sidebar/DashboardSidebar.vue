<script setup lang="ts">
defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const nav = [
  { to: '/dashboard', label: 'Accueil', icon: 'lucide:notebook-tabs' },
  { to: '/dashboard/add', label: 'Créer une recette', icon: 'lucide:plus' }
]

const adminNav = [
  { to: '/dashboard/admin/cuisines', label: 'Cuisines', icon: 'lucide:cooking-pot' },
  { to: '/dashboard/admin/ingredients', label: 'Ingrédients', icon: 'lucide:carrot' },
  { to: '/dashboard/admin/recipes', label: 'Recettes', icon: 'lucide:book-open' }
]

const user = useAuth().getUser()

const handleLinkClick = () => {
  emit('close')
}
</script>

<template>
  <aside class="dh-sidebar" :class="{ 'is-open': isOpen }">
    <div class="dh-sidebar__navs">
      <SidebarLinkGroup :links="nav" @link-click="handleLinkClick" />
      <SidebarLinkGroup v-if="user?.is_admin" :links="adminNav" label="Administration" @link-click="handleLinkClick" />
    </div>
    <SidebarUser :user="user!" />
  </aside>
</template>

<style lang="scss">
.dh-sidebar {
  --dh-sidebar-bg-color: var(--color-primary-50);
  background-color: var(--dh-sidebar-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100%;
  height: 100%;
  max-width: rem(300);
  width: 100%;

  border-right: 1.5px solid var(--color-primary-200);
  padding: rem(24);

  @include large-down {
    height: 100vh;
    padding-top: rem(68);
  }

  @include medium-down {
    padding: rem(64) rem(20) rem(20);
    max-width: rem(280);
  }

  @include small-only {
    padding: rem(60) rem(16) rem(16);
    max-width: rem(260);
  }

  &__navs {
    display: flex;
    flex-direction: column;
    gap: rem(32);

    @include medium-down {
      gap: rem(24);
    }
  }
}
</style>