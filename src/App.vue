<template>
  <vs-button v-if="userStore.user !== null" @click="userStore.logout">Logout</vs-button>
  <Navbar />
  <RouterView />
</template>

<script setup>
import { useUserStore } from "./stores/user";
const userStore = useUserStore();
onMounted(async () => {
  await userStore.init();
});
</script>
