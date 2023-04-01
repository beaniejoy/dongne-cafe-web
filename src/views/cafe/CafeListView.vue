<template>
  <v-main class="text-center">
    <v-container class="h-full">
      <SearchBar class="mt-10" @search-cafes="searchCafes" />
      <div class="my-auto">
        <div class="grid grid-cols-3 grid-rows-2 gap-4">
          <v-card v-for="cafe in cafes" :key="cafe">
            <v-img />
            <v-card-item>
              <v-card-title>{{ cafe.name }}</v-card-title>
            </v-card-item>
          </v-card>
        </div>
      </div>
    </v-container>
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