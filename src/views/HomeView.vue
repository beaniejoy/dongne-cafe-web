<template>
  <v-main class="grid content-center home-view">
    <v-container>
      <v-responsive class="block mx-auto " max-width="600">
        <div class="flex justify-end mr-5">
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
    </v-container>
  </v-main>
</template>

<script>
import SearchBar from '@/components/common/SearchBar.vue'
import { authToken } from '@/api/auth/AuthToken'
import { authService } from '@/api/auth/AuthService'
import commonMixin from '@/components/common/mixins/commonMixin'

export default {
  name: 'HomeView',
  components: {
    SearchBar
  },
  mixins: [commonMixin],
  data() {
    return {
      authBtnGroup: {
        class: 'mx-1 my-1', // btn common class name
        size: 'small', // btn common size 
        btns: []
      },
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
      this.authBtnGroup.btns = !authToken.isAuthenticated() ? 
        [
          {
            color: 'primary',
            toPath: { name: 'Login' },
            name: '로그인'
          },
          {
            color: 'warning',
            toPath: { name: 'SignUp' },
            name: '회원가입'
          },
        ] :
        [
          {
            color: 'error',
            click: this.logout,
            name: '로그아웃'
          },
        ]  
    },
    async logout() {
      try {
        await authService.logout()

        this.$router.go(0)
      } catch (e) {
        this.handleError(e)
      }
    },
    searchCafes(cafeKeyword) {
      this.$router.push({ name: 'CafeList', query: { q: cafeKeyword } })
    },
  },
}
</script>
<style lang="scss" scoped>
.home-view {
  background-image: url("@/assets/img/home.jpg");
  background-size: cover;
  opacity: 0.8;
}
</style>