<template>
  <v-responsive class="block mx-auto" max-width="500">
    <v-text-field 
      v-model="cafeKeyword"
      label="원하는 카페가 어디인가요?"
      variant="solo"
      prepend-inner-icon="mdi-coffee"
      append-inner-icon="mdi-magnify"
      single-line
      clearable
      @keyup.enter="searchCafes"
      @click:append-inner="searchCafes"
    />
  </v-responsive>
</template>

<script>
export default {
  emits: {
    searchCafes: null
  },
  data() {
    return {
      cafeKeyword: null,
    }
  },
  methods: {
    searchCafes() {
      this.$emit('searchCafes', this.cafeKeyword)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>