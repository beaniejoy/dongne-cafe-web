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
    
    <br />

    <v-btn
      class="text-white"
      color="brown darken-1"
      block
      :disabled="!checkValidation"
      @click="signup"
    >
      회원가입
    </v-btn>
  </v-container>
</template>

<script>
import commonMixin from '@/components/common/mixins/commonMixin'
import authFormSetup from '@/components/common/setup/authFormSetup'

export default {
  mixins: [commonMixin],
  setup() {
    return authFormSetup()
  },
  methods: {
    async signup() {
      console.log('signup')
      this.v$.email.$errors.forEach(error => {
        console.log(error)
      })
      this.v$.email.$touch()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>