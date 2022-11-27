<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Email"
            :rules="[rules.required, rules.emailFormat]"
            outlined
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Password"
            :rules="[rules.required]"
            :type="showPassword"
            :append-icon="toggleAppendIcon"
            @click:append="toggleShowPassword"
            hint="At least 8 characters"
            outlined
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
        emailFormat: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        // max: value => (value || '').length <= 20 || 'Max 20 characters',
      },
      isShowPassword: false,
    };
  },
  computed: {
    showPassword() {
      return this.isShowPassword ? 'text' : 'password';
    },
    toggleAppendIcon() {
      return this.isShowPassword ? 'mdi-eye' : 'mdi-eye-off';
    }
  },
  methods: { 
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    }
  }
};
</script>

<style>

</style>