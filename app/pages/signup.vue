<script setup lang="ts">


</script>

<template>
  <div class="p-signup">
    <section>
      <UITitle>Inscription</UITitle>
      <p>Créez un compte pour accéder à toutes les fonctionnalités.</p>
      <NuxtLink to="/login" class="p-signup__login">Vous avez un compte ? Connectez-vous</NuxtLink>
    </section>
    <SignupForm />
  </div>
</template>

<style lang="scss">
.p-signup {
  display: grid;
  grid-template-columns: 1fr 1fr;


  &__login {
    margin-top: rem(16);
    text-decoration: none;
    color: var(--color-primary-500);
  }
}

</style>