<template>
  <v-card class="mx-auto" min-width="380" elevation="6">
    <v-card-item>
      <div class="text-subtitle-1">
        우리 동네 카페
      </div>
      <div class="text-2xl">
        회원 가입
      </div>
    </v-card-item>
    <SignupForm />
  </v-card>
</template>

<script>
import SignupForm from '@/components/auth/SignupForm.vue'

export default {
  components: {
    SignupForm
  },
  data() {
    return {

    }
  },
}
</script>

<style>

</style>