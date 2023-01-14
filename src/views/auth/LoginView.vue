<template>
  <v-main class="mx-auto d-flex align-center">
    <v-content>
      <v-container>

        <v-card :max-width="size" elevation="6">
          <v-img
            class="white--text align-end"
            max-height="300px"
            src="@/assets/img/main_login.jpg"
            eager
          >
            <v-card-title class="ml-3 mb-1">
              <span class="card-title">우리 동네 카페</span>
            </v-card-title>
          </v-img>

          <v-card-text class="pb-0">
            <!-- LoginForm Component -->
            <login-form />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
          
            <router-link class="pr-2 pb-2" to="/signup">
              <span class="text-amber-700">회원가입</span>
            </router-link>
          </v-card-actions>
        </v-card>

      </v-container>
    </v-content>
  </v-main>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  computed: {
    size() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
      case 'sm':
      case 'md':
      case 'lg':
      case 'xl':
        return 380;
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