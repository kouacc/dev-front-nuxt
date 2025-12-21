<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div class="p-login">
    <UITitle align="center">Connexion</UITitle>
    <LoginForm />
    <div class="p-login__signup">
      <span>Pas encore de compte ?</span>
      <UIButton variant="ghost" size="small" as="link" to="/signup">S'inscrire</UIButton>
    </div>
  </div>
</template>

<style lang="scss">
  .p-login {
    // center the content
    display: grid;
    place-items: center;
    gap: rem(32);

    > * {
      max-width: rem(600);
      width: 100%;
    }

    &__signup {
      text-align: center;
      background-color: var(--color-white);
      padding: rem(16);
      border: 1px solid var(--color-grey-200);
      border-radius: rem(16);

      & span {
        margin-right: rem(10);
      }
    }
  }

</style>