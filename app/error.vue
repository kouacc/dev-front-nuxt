<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <span class="error-page__code">{{ error?.statusCode || 500 }}</span>
      <UITitle type="heading1" align="center">
        {{ error?.message || 'Une erreur est survenue' }}
      </UITitle>

      <UIButton class="error-page__btn" as="link" to="/" variant="default" size="medium">
        <Icon name="lucide:home" />
        Retour à l'accueil
      </UIButton>

    </div>
  </div>
</template>
