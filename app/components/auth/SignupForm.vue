<script setup lang="ts">
const auth = useAuth()
const toast = useToast()

const form = reactive<RegisterPayload & { confirm_password: string }>({
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  username: '',
  is_admin: false
})
const onSubmitSignup = async () => {
  try {
    if (!isPasswordValid.value.full) {
      toast.addToast({ title: 'Erreur', message: 'Le mot de passe ne respecte pas les critères de sécurité.', type: 'error', duration: 5000 })
    }
    if (!isPasswordSame.value) {
      toast.addToast({ title: 'Erreur', message: 'Les mots de passe ne correspondent pas.', type: 'error', duration: 5000 })
    }
    await auth.register(form)
  } catch {
    toast.addToast({ title: 'Erreur', message: 'Erreur lors de l\'inscription.', type: 'error', duration: 5000 })
  }
}


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

<style lang="scss">
.register-form {
  --rf-bg-color: var(--color-white);
  --rf-border-color: var(--color-grey-200);

  background-color: var(--rf-bg-color);
  border: 1px solid var(--rf-border-color);
  border-radius: rem(16);
  padding: rem(24);
  max-width: rem(500);

  display: flex;
  flex-direction: column;
  gap: rem(16);

  &__vl--valid {
    color: var(--color-green-500);
  }

  &__vl--invalid {
    color: var(--color-red-500);
  }
}

</style>