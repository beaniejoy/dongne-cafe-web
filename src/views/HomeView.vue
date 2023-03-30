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
    <SearchBar @search-cafes="searchCafes" />
  </v-main>
</template>

<script>
import CookiesUtils from '@/utils/CookiesUtils'
import SearchBar from '@/components/common/SearchBar.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar
  },
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
    this.initSetup()
  },
  methods: {
    initSetup() {
      console.log('#### HomeView Init ####')
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
    searchCafes(cafeKeyword) {
      // TODO cafe search api 적용하기
      this.$router.push({ name: 'CafeList', query: { q: cafeKeyword } })
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