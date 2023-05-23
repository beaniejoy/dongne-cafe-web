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
        height="250"
        hide-delimiter-background
        hide-delimiters
      >
        <v-carousel-item
          v-for="(image, i) in cafeDetail.images"
          :key="`image_${i}`"
          :src="image.imgUrl"
          height="100%"
          cover
        />
      </v-carousel>

      <v-card-item>
        <v-card-title>{{ cafeDetail.name }}</v-card-title>
      </v-card-item>

      <v-card-text>
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
            {{ cafeDetail.totalRate }} (413)
          </div>
        </v-row>
      </v-card-text>

      <v-card 
        v-for="(menu, i) in cafeDetail.menus" 
        :key="`menu_${i}`"
        elevation="0"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title>
              {{ menu.name }}
            </v-card-title>

            <v-card-subtitle>{{ menu.price }}</v-card-subtitle>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            rounded="0"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" />
          </v-avatar>
        </div>
      </v-card>

      <v-card-actions>
        <v-btn
          color="deep-purple-lighten-2"
          variant="text"
        >
          Reserve
        </v-btn>
      </v-card-actions>
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