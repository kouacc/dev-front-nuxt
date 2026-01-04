<script setup lang="ts">
import type { JWTPayload } from '~/types/jwt'

defineProps<{
  user: JWTPayload
}>()
</script>

<template>
  <div class="sidebar-user">
    <div class="sidebar-user__info">
      <UIAvatar :name="user!.username" />
      <span>{{ user?.username }}</span>
    </div>
    <UITooltip content="Déconnexion" :delay="1000">
      <button class="sidebar-user__btn" @click="useAuth().logout">
        <Icon name="lucide:log-out" size="20" />
      </button>
    </UITooltip>
  </div>
</template>

<style lang="scss">
.sidebar-user {
  --sd-user-bg-color: var(--color-white);

  background-color: var(--sd-user-bg-color);
  padding: rem(8);
  border-radius: rem(12);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  @include medium-down {
    padding: rem(6);
  }

  &__info {
    display: inline-flex;
    align-items: center;
    gap: rem(8);

    @include small-only {
      gap: rem(6);
    }

    > span {
      font-weight: 600;
      font-size: rem(14);
      color: var(--color-grey-800);

      @include medium-down {
        font-size: rem(13);
      }

      @include small-only {
        font-size: rem(12);
        max-width: rem(120);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  &__btn {
    --sd-user-btn-color: transparent;

    background: var(--sd-user-btn-color);
    color: var(--color-text);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.1s ease-in-out;
    padding: rem(8);
    border-radius: rem(8);
    display: flex;

    @include medium-down {
      padding: rem(6);
    }

    &:hover {
      --sd-user-btn-color: var(--color-primary-50);
    }
  }
}
</style>
