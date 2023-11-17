<template>
  <v-container>
    <template v-for="(field, key) in fields" :key="key">
      <v-text-field 
        v-model="field.value"
        :label="field.label"
        :type="field.type"
        :append-inner-icon="field.appendIcon"
        :error-messages="v$[key].$errors.map(e => e.$message)"
        variant="filled"
        density="compact"
        clearable
        @input="v$[key].$touch"
        @blur="v$[key].$touch"
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
      @click="signup"
    >
      회원가입
    </v-btn>
  </v-container>
</template>

<script>
import commonMixin from '@/components/common/mixins/commonMixin'
import authFormSetup from '@/components/auth/authFormSetup'
import { authService } from '@/api/auth/AuthService'

export default {
  mixins: [commonMixin],
  setup() {
    return authFormSetup()
  },
  methods: {
    async signup() {
      const checkValidateInputs = await this.v$.$validate()
      if (!checkValidateInputs) {
        alert('입력 정보를 확인해주세요')
        return
      }

      try {
        const response = await authService.joinMemberApi({ 
          email: this.fields.email.value, 
          password: this.fields.password.value 
        })

        if (response.result === 'SUCCESS') {
          alert('회원가입을 축하드립니다.\n인증을 위해 로그인 페이지로 이동합니다.')
          this.$router.replace({ name: 'Login' })
        }
      } catch (e) {
        this.handleError(e)
        this.isNotAuthenticated = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>