<script setup lang="ts">
const form = reactive<RegisterPayload & { confirm_password: string }>({
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  username: '',
  is_admin: false
})
</script>
<template>
  <form class="register-form" @submit.prevent="onSubmitSignup">
    <UIInput v-model="form.first_name" label="Prénom" type="text" required />
    <UIInput v-model="form.last_name" label="Nom" type="text" required />
    <UIInput v-model="form.username" label="Nom d'utilisateur" type="text" required />
    <UIInput v-model="form.email" label="Adresse e-mail" type="email" required />
    <UIInput v-model="form.password" label="Mot de passe" type="password" :color="passwordInputColor" required />

    <UIButton as="button" type="submit">S'inscrire</UIButton>
  </form>
</template>
