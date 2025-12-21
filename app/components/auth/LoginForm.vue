<script setup lang="ts">
const auth = useAuth()

const form = reactive<LoginPayload>({
  email: '',
  password: ''
})

const submitLoginForm = async () => {
  try {
    await auth.login(form)
    navigateTo('/dashboard')
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la connexion.'
    })
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="submitLoginForm">
    <UIInput
      v-model="form.email"
      label="Adresse e-mail"
      type="email"
      size="large"
      required
    />
    <UIInput
      v-model="form.password"
      label="Mot de passe"
      type="password"
      size="large"
      required
    />
    <UIButton type="button" class="login-form__submit" @click="submitLoginForm">Se connecter</UIButton>
  </form>
</template>

<style lang="scss">
.login-form {
  --lf-bg-color: var(--color-white);
  --lf-border-color: var(--color-grey-200);

  background-color: var(--lf-bg-color);
  border: 1px solid var(--lf-border-color);
  border-radius: rem(16);
  padding: rem(24);
  max-width: rem(500);

  display: flex;
  flex-direction: column;
  gap: rem(16);
  
  &__submit {
    margin-top: rem(8);
    align-self: flex-end;
  }
}
</style>