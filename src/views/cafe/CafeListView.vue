<template>
  <v-main class="grid content-center">
    Hello
  </v-main>
</template>

<script>
import { cafeService } from '@/api/cafe/CafeService'

export default {
  data() {
    return {
      cafes: []
    }
  },
  async created() {
    console.log('#### CafeListView Init ####')

    try {
      const cafesPageResponse = await this.searchCafes(this.$route.query.q)
      this.cafes = cafesPageResponse.content
      
    } catch (e) {
      console.error(e)
      // TODO error handling 더 고민해볼 것
      this.handleError(e)
    }
  }, 
  methods: {
    async searchCafes(name) {
      const response = await cafeService.searchCafesApi(name)
      return response.data
    },
    handleError(msg) {
      alert(msg)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>