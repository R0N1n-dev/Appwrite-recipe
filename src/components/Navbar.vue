<script setup>
const activeItem = ref(0);
</script>
<template>
  <div>
    <vs-navbar v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title> Hello world </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <router-link to="/">Home</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <router-link to="/about">About</router-link>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

a.router-link-exact-active {
  font-weight: 600;
  color: var(--color-text);
  background-color: lightcoral;
}
a.router-link-exact-active:hover {
  background-color: lightcoral;
}

a:hover {
  background-color: lightblue;
  font-weight: bolder;
}
</style>
