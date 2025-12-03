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
