<script setup lang="ts">
const user = useAuth().getUser()

//TODO: déconnexion avec prompt modal
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

  &__info {
    display: inline-flex;
    align-items: center;
    gap: rem(8);

    > span {
      font-weight: 600;
      font-size: rem(14);
      color: var(--color-grey-800);
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

    &:hover {
      --sd-user-btn-color: var(--color-primary-50);
    }
  }
}
</style>