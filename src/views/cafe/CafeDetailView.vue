<template>
  <v-main>
    <v-card
      class="mx-auto"
      max-width="600"
      elevation="6"
      height="100%"
    >
      <template #loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        />
      </template>

      <v-img
        cover
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      />

      <v-card-item>
        <v-card-title>Cafe Badilico</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="cafeDetail?.totalRate"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          />
          <div class="text-grey ms-4">
            {{ cafeDetail?.totalRate }} (413)
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          $ • Italian, Cafe
        </div>
      </v-card-text>

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

export default {
  name: 'CafeDetail',
  mixins: [commonMixin],
  data() {
    return {
      cafeDetail: null
    }
  },
  async created() {
    try {
      const response = await cafeService.getCafeDetail(this.$route.params.cafe_name)
      this.cafeDetail = response.data
    } catch (e) {
      this.handleError(e)
    }
  }
}
</script>

<style>

</style>