<template>
  <nav>
    <span>{{ props.menu.title }}</span>
    <ul>
      <li v-for="(i, index) in props.menu.items" :key="index">
        <NuxtLink :to="i.link">{{ i.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>