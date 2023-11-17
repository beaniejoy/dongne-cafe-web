<template>
  <v-main>
    <v-card
      v-if="isLoaded"
      class="mx-auto"
      :max-width="cardDetailWidth"
      elevation="6"
      height="100%"
    >
      <CafeDetailTopImages :cafe-images="cafeDetail.cafeImages" />

      <v-card-item>
        <v-card-title class="my-2">
          <v-icon icon="mdi-coffee" class="mr-2" />
          {{ $filters.cafeNameWhiteSpace(cafeDetail.name) }}
        </v-card-title>
      </v-card-item>

      <v-card-text class="my-2">
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="cafeDetail.totalRate"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          />
          <div class="text-grey ms-4">
            {{ cafeDetail.totalRate }}
          </div>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4 mb-1" />

      <CafeDetailCategory 
        :cafe-menu-categories="cafeDetail.cafeMenuCategories" 
      />
    </v-card>
  </v-main>
</template>

<script>
import { cafeService } from '@/api/cafe/CafeService'
import commonMixin from '@/components/common/mixins/commonMixin'
import { mapMutations } from 'vuex'
import CafeDetailTopImages from '@/components/cafe/CafeDetailTopImages.vue'
import CafeDetailCategory from '@/components/cafe/CafeDetailCategory.vue'

export default {
  name: 'CafeDetail',
  components: {
    CafeDetailTopImages,
    CafeDetailCategory
  },
  mixins: [commonMixin],
  data() {
    return {
      cardDetailWidth: 600,
      isLoaded: false,
      cafeDetail: null
    }
  },
  async created() {
    this.turnOnLoading()
    
    try {
      const response = await cafeService.getCafeDetail(this.$route.params.cafe_name)
      this.cafeDetail = response.data
    } catch (e) {
      this.handleError(e)
    } finally {
      this.turnOffLoading()
      this.isLoaded = true
    }
  },
  methods: {
    ...mapMutations('common', [
      'turnOnLoading',
      'turnOffLoading'
    ])
  }
}
</script>

<style>

</style>