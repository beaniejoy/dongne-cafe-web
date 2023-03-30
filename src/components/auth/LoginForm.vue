<template>
  <v-container>
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      variant="filled"
      density="compact"
      clearable
    />
    <v-text-field 
      v-model="password"
      label="Password"
      variant="filled"
      density="compact"
      clearable
      :type="showPassword"
      :append-icon="toggleAppendIcon"
      @click:append="toggleShowPassword"
    />
    <v-alert
      v-if="isNotAuthenticated"
      type="error"
      variant="outlined"
      density="compact"
    >
      {{ errorMsg }}
    </v-alert>

    <br />

    <v-btn
      class="text-white"
      color="brown darken-1"
      block
      :disabled="checkValidation"
      @click="signin"
    >
      로그인
    </v-btn>
  </v-container>
</template>

<script>
import { authService } from '@/api/auth/AuthService'
import commonMixin from '@/mixins/commonMixin'
import CookiesUtils from '@/utils/CookiesUtils'

export default {
  mixins: [commonMixin],
  data() {
    return {
      email: null,
      password: null,
      rules: {
        required: (value) => value,
        emailFormat: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value)
        },
      },
      isShowPassword: false,
      isNotAuthenticated: false,
      errorMsg: '', // error message
    }
  },
  computed: {
    showPassword() {
      return this.isShowPassword ? 'text' : 'password'
    },
    toggleAppendIcon() {
      return this.isShowPassword ? 'mdi-eye' : 'mdi-eye-off'
    },
    checkValidation() {
      if (!this.rules.required(this.email) || !this.rules.required(this.password)) {
        return true
      }

      if (!this.rules.emailFormat(this.email)) {
        return true
      }

      return false
    },
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    },
    async signin() {
      try {
        const data = await this.authenticate()
        CookiesUtils.setCookie(
          process.env.VUE_APP_ACCESS_TOKEN_COOKIE,
          data.accessToken,
          60 * 60
        )

        // TODO 상황에 따라 해당 페이지로 이동
        // ex. cafe a로 링크타고 들어왔는데 로그인 페이지 이동 > 로그인 > 이후 다시 cafe a 페이지로 이동
        this.$router.replace({ name: 'Home' })
      } catch (e) {
        this.handleError(e)
      }
    },
    async authenticate() {
      const responseData = await authService.authenticateApi({
        email: this.email,
        password: this.password,
      })

      console.log('authenticate result:', responseData)

      return responseData.data
    }
  },
}
</script>
