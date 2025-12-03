<script setup lang="ts">
const user = useAuth().getUser() 
</script>

<template>
  <div class="sidebar-user">
    <div>
      
      <span>{{ user?.username }}</span>
    </div>
    <button @click="useAuth().logout"><Icon name="lucide:log-out" size="20" /></button>
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

  > button {
    --sd-user-btn-color: transparent;

    background: var(--sd-user-btn-color);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.1s ease-in-out;
    padding: rem(8);
    border-radius: rem(8);

    &:hover {
      --sd-user-btn-color: var(--color-primary-50);
    }
  }
}
</style>