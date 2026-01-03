<template>
  <nav class="m-admintabs">
    <ul class="m-admintabs-list">
      <li>
        <NuxtLink class="m-admintabs-list__item" exact-active-class="m-admintabs-list__item--active" to="/dashboard/admin/cuisines">Cuisines</NuxtLink>
      </li>
      <li>
        <NuxtLink class="m-admintabs-list__item" exact-active-class="m-admintabs-list__item--active" to="/dashboard/admin/ingredients">Ingrédients</NuxtLink>
      </li>
      <li>
        <NuxtLink class="m-admintabs-list__item" exact-active-class="m-admintabs-list__item--active" to="/dashboard/admin/recipes">Recettes</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.m-admintabs {
  margin-bottom: rem(24);

  @include medium-down {
    margin-bottom: rem(16);
    overflow-x: auto;
    overflow-y: hidden;
  }

  &-list {
    list-style: none;
    display: flex;
    gap: rem(32);
    padding: 0;
    margin: 0;
    

    @include medium-down {
      gap: rem(24);
      min-width: max-content;
    }

    @include small-only {
      gap: rem(16);
    }

    &__item {
      padding-bottom: rem(12);
      font-weight: 500;
      color: var(--color-text-secondary);
      border-bottom: 2px solid transparent;
      text-decoration: none;
      white-space: nowrap;

      @include medium-down {
        padding-bottom: 0;
        font-size: rem(14);
      }

      &--active {
        color: var(--color-primary-400);
        border-bottom-color: var(--color-primary-500);

        @include medium-down {
          border-bottom: 0px;
        }
      }
    }
  }
}
</style>
