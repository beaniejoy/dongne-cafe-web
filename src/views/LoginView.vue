<template>
  <v-main class="mx-auto d-flex align-center">
    <v-card :max-width="size" elevation="6">
      <v-img
        contain
        class="white--text align-end"
        max-height="400px"
        src="@/assets/img/main_login.jpg"
        eager
      >
        <v-card-title class="ml-3 mb-1">
          <span class="card-title">우리 동네 카페</span>
        </v-card-title>
      </v-img>
      <v-card-text>
        <!-- LoginForm Component -->
        <login-form />
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import LoginForm from '@/components/account/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  computed: {
    size() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return 330;
      case 'sm':
        return 400;
      case 'md':
        return 450;
      case 'lg':
      case 'xl':
        return 500;
      default:
        return 0;
      }
    }
  },
  created() {
    
  }
};
</script>

<style>

</style>