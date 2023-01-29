<template>
  <v-main class="grid content-center">
    <v-responsive class="mx-auto" width="500">
      <div class="flex justify-end">
        <v-btn 
          v-for="btn in authBtnGroup.btns"
          :key="btn"
          :class="authBtnGroup.class"
          :size="authBtnGroup.size"
          :color="btn.color"
          :to="btn.toPath"
          @click="btn.click"
        >
          {{ btn.name }}
        </v-btn>
      </div>
    </v-responsive>
    <br />
    <v-responsive class="mx-auto" min-width="500">
      <v-text-field 
        label="원하는 카페는 어디인가요?"
        variant="solo"
        prepend-icon="mdi-coffee"
        append-inner-icon="mdi-magnify"
        single-line
      />
    </v-responsive>
  </v-main>
</template>

<script>
import CookiesUtils from '@/utils/CookiesUtils'
export default {
  name: 'HomeView',
  data() {
    return {
      authBtnGroup: {
        class: 'mx-1 my-1', // btn common class name
        size: 'small', // btn common size 
        btns: []
      },
    }
  },
  computed: {
    checkAuthenticated() {
      return CookiesUtils.getCookie(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log('HomeView Init')
      this.initAuthBtnGroup()
    },
    initAuthBtnGroup() {
      this.authBtnGroup.btns = !this.checkAuthenticated ? 
        [
          {
            color: 'primary',
            toPath: '/login',
            name: '로그인'
          },
          {
            color: 'warning',
            toPath: '/signup',
            name: '회원가입'
          },
        ] :
        [
          {
            color: 'error',
            click: this.logout,
            name: '회원가입'
          },
        ]
      
    },
    logout() {
      if (CookiesUtils.removeIfExisted(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)) {
        this.$router.replace({ name: 'login' })
      }
    }
  },
}
</script>
