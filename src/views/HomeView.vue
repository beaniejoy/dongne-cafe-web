<template>
  <v-main class="grid content-center">
    <v-card class="mx-auto" width="400">
      <v-img alt="Vue logo" :src="require('@/assets/logo.png')" />
      <router-link to="/">Home</router-link>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
