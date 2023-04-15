<template>
  <v-card class="mx-auto" max-width="380" elevation="6">
    <v-img
      class="align-end text-white"
      width="380px"
      max-height="300px"
      src="@/assets/img/main_login.jpg"
      lazy-src="https://picsum.photos/10/6?image=10"
      cover
    >
      <template #:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular 
            color="grey-lighten-4" 
            indeterminate 
          />
        </div>
      </template>
      <v-card-title class="ml-3 mb-1">
        우리 동네 카페
      </v-card-title>
    </v-img>

    <v-card-text class="pb-0">
      <!-- LoginForm Component -->
      <LoginForm />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      
      <router-link class="pr-2 pb-2" to="/signup">
        <span>회원가입</span>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  created() {
    console.log('created LoginView')
  },
}
</script>
