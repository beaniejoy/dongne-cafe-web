<template>
  <v-main class="grid content-center">
    <v-card class="mx-auto" width="400">
      <v-img alt="Vue logo" :src="require('@/assets/logo.png')" />
      <v-btn v-if="!checkAuthenticated"><router-link to="/login">Login</router-link></v-btn>
      <v-btn v-else @click="logout">Logout</v-btn>
    </v-card>
  </v-main>
</template>

<script>
import CookiesUtils from '@/utils/CookiesUtils';
export default {
  name: 'HomeView',
  computed: {
    checkAuthenticated() {
      return CookiesUtils.getCookie(process.env.VUE_APP_ACCESS_TOKEN_COOKIE);
    }
  },
  methods: {
    logout() {
      if (CookiesUtils.removeIfExisted(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)) {
        this.$router.replace({ name: 'login' });
      }
    }
  }
};
</script>
