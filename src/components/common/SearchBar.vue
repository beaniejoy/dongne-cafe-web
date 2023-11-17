<template>
  <div class="block mx-auto" max-width="500">
    <v-text-field 
      v-model="cafeKeyword"
      label="원하는 카페가 어디인가요?"
      variant="solo"
      prepend-inner-icon="mdi-coffee"
      append-inner-icon="mdi-magnify"
      single-line
      clearable
      :disabled="searchBarDisabled"
      @keyup.enter="searchCafes"
      @click:append-inner="searchCafes"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    inputKeyword: {
      type: String,
      default: null
    },
  },
  emits: {
    searchCafes: null,
  },
  data() {
    return {
      cafeKeyword: null
    }
  },
  computed: {
    ...mapState('cafe', [
      'searchBarDisabled'
    ])
  },
  created() {
    console.log('#### SearchBar Init ####')
    this.cafeKeyword = this.inputKeyword
  },
  methods: {
    ...mapMutations('cafe', [
      'updateSearchBarDisabled'
    ]),
    searchCafes() {
      this.updateSearchBarDisabled(true)
      this.$emit('searchCafes', this.cafeKeyword)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>