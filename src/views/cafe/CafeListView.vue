<template>
  <v-main class="grid content-center">
    <SearchBar @search-cafes="searchCafes" />
    Hello
  </v-main>
</template>

<script>
import { cafeService } from '@/api/cafe/CafeService'
import commonMixin from '@/mixins/commonMixin'
import SearchBar from '@/components/common/SearchBar.vue'

export default {
  components: {
    SearchBar
  },
  mixins: [commonMixin],
  data() {
    return {
      cafes: []
    }
  },
  async created() {
    console.log('#### CafeListView Init ####')

    try {
      await this.searchCafes(this.$route.query.q)
      console.log(this.cafes)
    } catch (e) {
      this.handleError(e)
    }
  }, 
  methods: {
    async searchCafes(name) {
      const response = await cafeService.searchCafesApi(name)
      this.cafes = response.data.content
    }
  }
}
</script>

<style lang="scss" scoped>

</style>