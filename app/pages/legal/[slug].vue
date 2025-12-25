<template>
  <div>
    <UITitle>{{ page?.title }}</UITitle>
    <p>Dernière mise à jour : {{ page?.lastUpdated }}</p>
    <SanityContent :value="page?.content" />
  </div>
</template>

<style lang="scss">

</style>