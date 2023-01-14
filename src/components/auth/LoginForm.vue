<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Email"
            v-model="email"
            hide-details="false"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12">
          <v-text-field 
            label="Password"
            v-model="password"
            :type="showPassword"
            :append-icon="toggleAppendIcon"
            @click:append="toggleShowPassword"
            hide-details="false"
            outlined
            dense
          />
        </v-col>
        <v-col v-if="isNotAuthenticated">
          <v-alert
            type="error"
            outlined
            dense
          >
            {{ errorMsg }}
          </v-alert>
        </v-col>
        <v-col cols="12">
          <v-btn
            class="white--text"
            color="brown darken-1"
            block
            :disabled="checkValidation"
            @click="signin"
          >
            로그인
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { authenticateApi } from '@/api/auth';
import { setCookie } from '@/utils/cookies';

export default {
  data() {
    return {
      email: null,
      password: null,
      rules: {
        required: (value) => value,
        emailFormat: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value);
        },
      },
      isShowPassword: false,
      isNotAuthenticated: false,
      errorMsg: '', // error message
    };
  },
  computed: {
    showPassword() {
      return this.isShowPassword ? 'text' : 'password';
    },
    toggleAppendIcon() {
      return this.isShowPassword ? 'mdi-eye' : 'mdi-eye-off';
    },
    checkValidation() {
      if (!this.rules.required(this.email) || !this.rules.required(this.password)) {
        return true;
      }

      if (!this.rules.emailFormat(this.email)) {
        return true;
      }

      return false;
    },
  },
  methods: {
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    async signin() {
      try {
        const data = await this.authenticate();
        setCookie(
          process.env.VUE_APP_ACCESS_TOKEN_COOKIE,
          data.accessToken,
          60 * 60
        );
      } catch (e) {
        console.error(e);
        this.handleError(e.message);
      }
    },
    async authenticate() {
      const response = await authenticateApi({
        email: this.email,
        password: this.password,
      });

      this.checkError(response.data);

      return response.data;
    },
    handleError(msg) {
      this.isNotAuthenticated = true;
      this.errorMsg = msg;
    },
    checkError(data) {
      if (data.result === 'FAIL') {
        throw new Error(data.errorCode);
      }
    }
  },
};
</script>
