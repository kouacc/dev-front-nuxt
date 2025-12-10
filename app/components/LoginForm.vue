<script setup lang="ts">
const auth = useAuth()

const form = reactive<LoginPayload>({
  email: '',
  password: ''
})

const submitLoginForm = async () => {
  try {
    await auth.login(form)
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
