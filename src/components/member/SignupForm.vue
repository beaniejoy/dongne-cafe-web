<template>
  <v-container>
    <template v-for="(field, key) in fields" :key="key">
      <v-text-field 
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
    
    <br />

    <v-btn
      class="text-white"
      color="brown darken-1"
      block
      :disabled="!checkValidation"
    >
      회원가입
    </v-btn>
  </v-container>
</template>

<script>
import commonMixin from '@/mixins/commonMixin'
import authFormsSetup from '@/mixins/member/authMixin'

export default {
  mixins: [commonMixin],
  setup() {
    return authFormsSetup()
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>