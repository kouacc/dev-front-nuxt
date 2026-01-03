<script setup lang="ts">
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
</script>

<template>
  <aside class="dh-sidebar">
    <div class="dh-sidebar__navs">
      <SidebarLinkGroup :links="nav" />
      <SidebarLinkGroup v-if="user?.is_admin" :links="adminNav" label="Administration" />
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

  &__navs {
    display: flex;
    flex-direction: column;
    gap: rem(32);
  }
}
</style>