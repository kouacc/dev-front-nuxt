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

      <DevOnly>
        <div v-if="error?.stack" class="error-page__stack">
          <UITitle type="heading4"> Stack Trace </UITitle>
          <pre class="error-page__stack-content">{{ error.stack }}</pre>
        </div>
      </DevOnly>
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

  &__stack {
    margin-top: #{rem(48)};
    width: 100%;
    text-align: left;
  }

  &__stack-content {
    margin-top: #{rem(16)};
    padding: #{rem(16)};
    background-color: var(--color-grey-900);
    color: var(--color-grey-100);
    border-radius: #{rem(8)};
    overflow-x: auto;
    font-size: #{rem(12)};
    line-height: 1.6;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>
