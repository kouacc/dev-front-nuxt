<script setup lang="ts">

</script>

<template>
  <div class="p-login">
    <UITitle align="center">Connexion</UITitle>
    <LoginForm />
    <div class="p-login__signup">
      <span>Pas encore de compte ?</span>
      <UIButton variant="ghost" href="/signup">S'inscrire</UIButton>
    </div>
  </div>
</template>

<style lang="scss">
  .p-login {
    // center the content
    display: grid;
    place-items: center;

    > * {
      min-width: rem(600);
    }

    &__signup {
      margin-top: rem(16);
      text-align: center;
      background-color: var(--color-white);
      padding: rem(16);
      border: 1px solid var(--color-grey-200);
      border-radius: rem(16);

    }
  }

</style>