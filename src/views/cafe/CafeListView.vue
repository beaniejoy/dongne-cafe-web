<template>
  <v-main>
    <v-container class="h-full">
      <SearchBar 
        class="mt-10" 
        :input-keyword="$route.query.q" 
        @search-cafes="searchCafes" 
      />
      <div class="my-auto">
        <div class="grid justify-items-center gap-4 text-center sm:grid-cols-4 sm:grid-rows-2 max-sm:grid-flow-row max-sm:auto-rows-auto">
          <v-card 
            v-for="cafe in cafes" 
            :key="cafe" 
            width="100%" 
            max-width="280"
            @click="goDetailPage(cafe.name)"
          >
            <v-img 
              :src="cafe.images[0].imgUrl" 
              height="200"
              cover
            />
            <v-card-item>
              <v-card-title class="d-flex justify-space-between">
                <span>{{ cafe.name }}</span>
                <v-btn
                  class="inline-block"
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-heart"
                />
              </v-card-title>
            </v-card-item>
            <v-card-text class="mb-2">
              <v-row
                align="center"
                class="mx-0"
              >
                <!-- 카페 Rating -->
                <v-rating
                  :model-value="cafe.totalRate"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
                />
                <div class="text-grey ms-4">
                  {{ cafe.totalRate }} (413)
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapMutations } from 'vuex'
import { cafeService } from '@/api/cafe/CafeService'
import commonMixin from '@/components/common/mixins/commonMixin'
import SearchBar from '@/components/common/SearchBar.vue'

export default {
  components: {
    SearchBar
  },
  mixins: [commonMixin],
  data() {
    return {
      cafes: [],
      checkProcessSearchCafes: true
    }
  },
  async created() {
    console.log('#### CafeListView Init ####')

    await this.searchCafes(this.$route.query.q)
  }, 
  methods: {
    ...mapMutations('cafe', [
      'updateSearchBarDisabled'
    ]),
    ...mapMutations('common', [
      'turnOnLoading',
      'turnOffLoading'
    ]),
    async searchCafes(name) {
      this.turnOnLoading()
      // 중복 호출 방지
      if (!this.checkProcessSearchCafes) {
        return
      }

      try {
        // search 기능 비활성화
        this.checkProcessSearchCafes = false
        this.updateSearchBarDisabled(true)
        
        const response = await cafeService.searchCafesApi(name)
        this.cafes = response.data.content
      } catch (e) {
        this.handleError(e)
      } finally {
        // search 기능 활성화
        this.checkProcessSearchCafes = true
        this.updateSearchBarDisabled(false)
  
        this.$router.replace({ name: 'CafeList', query: { q: name } })

        this.turnOffLoading()
      }
    },
    goDetailPage(cafeName) {
      this.$router.push({ 
        name: 'CafeDetail', 
        params: { cafe_name: cafeName.split(' ').join('_') } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>