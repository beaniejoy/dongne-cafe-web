<template>
  <v-main>
    <v-card
      v-if="isLoaded"
      class="mx-auto"
      max-width="600"
      elevation="6"
      height="100%"
    >
      <v-carousel
        cycle
        height="250"
        show-arrows="hover"
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="(image, i) in cafeDetail.cafeImages"
          :key="`image_${i}`"
          :src="image.imgUrl"
          height="100%"
          cover
        />
      </v-carousel>

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

      <v-sheet
        v-for="category in cafeDetail.cafeMenuCategories" 
        :key="`category_${category.menuCategoryId}`"
        border
        class="py-4"
      >
        <div class="mb-4 px-2">
          <v-card-title>
            {{ category.name }}
          </v-card-title>

          <v-card-subtitle>{{ category.description }}</v-card-subtitle>
        </div>
        <div>
          <v-card 
            v-for="menu in category.cafeMenus"
            :key="`menu_${menu.cafeMenuId}`"
            elevation="0"
          >
            <div class="flex flex-nowrap justify-around">
              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" />
              </v-avatar>
          
              <div>
                <v-card-title>
                  {{ menu.name }}
                </v-card-title>

                <v-card-subtitle>{{ $filters.currencyKOR(menu.price) }}</v-card-subtitle>
                <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
              </div>
            </div>
          </v-card>
        </div>
      </v-sheet>
    </v-card>
  </v-main>
</template>

<script>
import { cafeService } from '@/api/cafe/CafeService'
import commonMixin from '@/components/common/mixins/commonMixin'
import { mapMutations } from 'vuex'

export default {
  name: 'CafeDetail',
  mixins: [commonMixin],
  data() {
    return {
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