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
  <div>
    <form @submit.prevent="submitLoginForm">
      <UIInput
        v-model="form.email"
        label="Email"
        type="email"
        required
      />
      <UIInput
        v-model="form.password"
        label="Mot de passe"
        type="password"
        required
      />
      <UIButton type="button" @click="submitLoginForm">Se connecter</UIButton>
    </form>
  </div>
</template>