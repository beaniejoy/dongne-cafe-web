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
        <v-card-title class="my-2">
          <v-icon icon="mdi-coffee" class="mr-2" />
          {{ $filters.cafeNameWhiteSpace(cafeDetail.name) }}
        </v-card-title>

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
      </v-card>

      <v-divider class="py-2" />

      <v-card height="100%">
        <v-row
          v-if="!isCategorySelected"
          align="center"
          justify="start"
          class="w-full mx-0 my-0"
        >
          <v-col
            v-for="(category) in cafeDetail.cafeMenuCategories"
            :key="`category_slide_${category.menuCategoryId}`"
            cols="3"
            class="px-2 py-2"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card 
                :elevation="isHovering ? 12 : 2"
                hover
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
              >
                <v-img 
                  src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                  height="200"
                  cover
                  :class="isHovering ? 'align-center' : 'align-end'"
                >
                  <div class="text-white">
                    <v-card-title>
                      {{ category.name }}
                    </v-card-title>

                    <v-card-subtitle v-show="isHovering">
                      {{ category.description }}
                    </v-card-subtitle>
                  </div>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <CafeDetailCategory
          v-else
          ref="cafeDetailCategory"
          :cafe-menu-categories="cafeDetail.cafeMenuCategories" 
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
      cardDetailWidth: 1000,
      isLoaded: false,
      cafeDetail: null,
      isCategorySelected: false
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
    moveToCategoryDirectly(categoryIndex) {
      this.$refs.cafeDetailCategory.moveToCategoryDirectly(categoryIndex)
    }
  }
}
</script>

<style>

</style>