<template>
  <v-main class="grid content-center home-view">
    <v-responsive class="mx-auto" width="600">
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
    <v-responsive class="mx-auto" min-width="600">
      <v-text-field 
        v-model="cafeKeyword"
        label="원하는 카페가 어디인가요?"
        variant="solo"
        prepend-inner-icon="mdi-coffee"
        append-inner-icon="mdi-magnify"
        single-line
        clearable
        @keyup.enter="searchCafeList"
        @click:append-inner="searchCafeList"
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
      cafeKeyword: null,
    }
  },
  computed: {
    checkAuthenticated() {
      return CookiesUtils.getCookie(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)
    }
  },
  created() {
    this.initSetup()
  },
  methods: {
    initSetup() {
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
        this.$router.replace({ name: 'Login' })
      }
    },
    searchCafeList() {
      // TODO cafe search api 적용하기
      this.$router.push({ name: 'CafeList', query: { q: this.cafeKeyword } })
    }
  },
}
</script>
<style lang="scss" scoped>
.home-view {
  background-image: url("@/assets/img/home.jpg");
  opacity: 0.8;
}
</style>