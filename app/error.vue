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

<style lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: #{rem(24)};
  background-color: var(--color-grey-50);

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: #{rem(600)};
    text-align: center;
  }

  &__code {
    font-size: #{rem(120)};
    font-weight: 700;
    line-height: 1;
    color: var(--color-primary-500);
    margin-bottom: #{rem(16)};
  }

  &__btn {
    margin-top: #{rem(24)};
  }
}
</style>
