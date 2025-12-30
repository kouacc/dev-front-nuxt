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
