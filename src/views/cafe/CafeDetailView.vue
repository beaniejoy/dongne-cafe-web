<template>
  <v-main>
    <v-card
      v-if="isLoaded"
      class="mx-auto"
      max-width="900"
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
                width="160"
                :elevation="isHovering ? 12 : 2"
                hover
                class="mx-auto"
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
                @click="selectCategory(category)"
              >
                <v-img 
                  :src="!isHovering ? 'https://cdn.vuetifyjs.com/images/cards/foster.jpg' : ''"
                  :lazy-src="isHovering ? 'https://cdn.vuetifyjs.com/images/cards/foster.jpg' : ''"
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

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { cafeService } from '@/api/cafe/CafeService'
import useCommonSetup from '@/components/common/useCommonSetup'
import CafeDetailTopImages from '@/components/cafe/CafeDetailTopImages.vue'
import CafeDetailMenuSection from '@/components/cafe/CafeDetailMenuSection.vue'

const { handleError } = useCommonSetup()

const isLoaded = ref(false)
const cafeDetail = ref(null)
const isCategorySelected = ref(false)
const selectedCategory = ref(null)

const route = useRoute()
const store = useStore()
const turnOnLoading = () => store.commit('common/turnOnLoading')
const turnOffLoading = () => store.commit('common/turnOffLoading')

const selectCategory = (category) => {
  selectedCategory.value = category
  isCategorySelected.value = true  // open CafeMenuSection component
}

const goBackToCategory = () => {
  isCategorySelected.value = false  // open CafeCategorySection component
  selectedCategory.value = null
}

const init = async () => {
  turnOnLoading()
      
  try {
    const response = await cafeService.getCafeDetail(route.params.cafe_name)
    cafeDetail.value = response.data
  } catch (e) {
    handleError(e)
  } finally {
    turnOffLoading()
    isLoaded.value = true
  }
}

init()
</script>

<style>

</style>