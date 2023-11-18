<template>
  <v-main>
    <v-card
      v-if="isLoaded"
      class="mx-auto"
      :max-width="cardDetailWidth"
      elevation="6"
      color="grey-lighten-2"
      height="100%"
    >
      <CafeDetailTopImages :cafe-images="cafeDetail.cafeImages" />

      <v-card>
        <v-card-item>
          <v-card-title class="my-2 text-center">
            <v-icon icon="mdi-coffee" class="mr-2" />
            {{ $filters.cafeNameWhiteSpace(cafeDetail.name) }}
          </v-card-title>
        </v-card-item>

        <v-card-text class="my-2">
          <v-row
            align="center"
            justify="center"
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
      </v-card>

      <v-divider class="py-2" />

      <v-card height="100%">
        <v-row
          v-if="!isCategorySelected"
          align="center"
          justify="start"
          class="w-full mx-0 my-0 px-5 py-5"
        >
          <v-col
            v-for="(category) in cafeDetail.cafeMenuCategories"
            :key="`category_slide_${category.menuCategoryId}`"
            sm="6"
            md="4"
            lg="3"
            xl="3"
            xxl="3"
            cols="12"
            class="px-4 py-4"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card 
                :elevation="isHovering ? 12 : 2"
                hover
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
                @click="selectCategory(category)"
              >
                <v-img 
                  :src="!isHovering ? 'https://cdn.vuetifyjs.com/images/cards/foster.jpg' : ''"
                  :lazy-src="isHovering ? 'https://cdn.vuetifyjs.com/images/cards/foster.jpg' : ''"
                  width="200"
                  aspect-ratio="1"
                  cover
                  :class="isHovering ? 'align-center' : 'align-end'"
                >
                  <div class="text-white">
                    <v-card-title>
                      {{ category.name }}
                    </v-card-title>

                    <v-card-text v-show="isHovering">
                      {{ category.description }}
                    </v-card-text>
                  </div>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <CafeDetailMenuSection
          v-else
          :category="selectedCategory"
          @go-back-to-category="goBackToCategory"
        />
      </v-card>
    </v-card>
  </v-main>
</template>

<script>
import { cafeService } from '@/api/cafe/CafeService'
import commonMixin from '@/components/common/mixins/commonMixin'
import { mapMutations } from 'vuex'
import CafeDetailTopImages from '@/components/cafe/CafeDetailTopImages.vue'
import CafeDetailMenuSection from '@/components/cafe/CafeDetailMenuSection.vue'

export default {
  name: 'CafeDetail',
  components: {
    CafeDetailTopImages,
    CafeDetailMenuSection
  },
  mixins: [commonMixin],
  data() {
    return {
      cardDetailWidth: 900,
      isLoaded: false,
      cafeDetail: null,
      isCategorySelected: false,
      selectedCategory: null
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
    ]),
    selectCategory(category) {
      this.selectedCategory = category
      this.isCategorySelected = true  // open CafeMenuSection component
    },
    goBackToCategory() {
      this.isCategorySelected = false  // open CafeCategorySection component
      this.selectedCategory = null
    }
  }
}
</script>

<style>

</style>