<template>
  <v-container>
    <template v-for="(field, key) in fields" :key="key">
      <v-text-field 
        v-if="field.isNeedLogin"
        v-model="field.value"
        :label="field.label"
        :type="field.type"
        :append-inner-icon="field.appendIcon"
        variant="filled"
        density="compact"
        clearable
        @click:append-inner="toggleInputStatus(key)"
      />
    </template>
    <v-alert
      v-if="isNotAuthenticated"
      type="error"
      variant="outlined"
      density="compact"
    >
      {{ error.message }}
    </v-alert>

    <br />

    <v-btn
      class="text-white"
      color="brown darken-1"
      block
      :disabled="!checkValidation"
      @click="signin"
    >
      로그인
    </v-btn>
  </v-container>
</template>

<script>
import { authService } from '@/api/auth/AuthService'
import { authToken } from '@/api/auth/AuthToken'
import commonMixin from '@/components/common/mixins/commonMixin'
import authFormSetup from '@/components/common/setup/authFormSetup'

export default {
  mixins: [commonMixin],
  setup() {
    return authFormSetup()
  },
  methods: {
    async signin() {
      try {
        const data = await this.authenticate()
        console.log(data.accessToken)
        authToken.updateAccessToken(data.accessToken)

        // TODO 상황에 따라 해당 페이지로 이동
        // ex. cafe a로 링크타고 들어왔는데 로그인 페이지 이동 > 로그인 > 이후 다시 cafe a 페이지로 이동
        this.$router.replace({ name: 'Home' })
      } catch (e) {
        this.handleError(e)
        this.isNotAuthenticated = true
      }
    },
    async authenticate() {
      const responseData = await authService.authenticateApi({
        email: this.fields.email.value,
        password: this.fields.password.value
      })

      console.log('authenticate result:', responseData)

      return responseData.data
    }
  },
}
</script>
