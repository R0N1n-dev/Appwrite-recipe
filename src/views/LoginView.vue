<script setup>
import { useUserStore } from "../stores/user";
const store = useUserStore();
const email = ref("");
const password = ref("");
</script>

<template>
  <section>
    <h1>Login or register</h1>
    <form>
      <vs-input type="email" placeholder="Email" v-model="email" />
      <vs-input type="password" placeholder="Password" v-model="password" />
      <div>
        <vs-button @click="store.login(email, password)">Login</vs-button>
        <vs-button @click="store.register(email, password)"> Register </vs-button>
      </div>
    </form>
  </section>
</template>
