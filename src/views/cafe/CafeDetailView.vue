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
        <CafeDetailCateogrySection 
          v-if="selectStep === 0"
          :categories="cafeDetail.cafeMenuCategories"
          @select-category="selectCategory"
        />
        <CafeDetailMenuSection
          v-else-if="selectStep === 1"
          :category="selectedCategory"
          @go-back-to-category="goBackToCategory"
          @select-menu="selectMenu"
        />
        <CafeDetailOptionSection 
          v-else
          :cafe-menu="selectedMenu"
          @go-back-to-menu="goBackToMenu"
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
import CafeDetailCateogrySection from '@/components/cafe/CafeDetailCateogrySection.vue'
import CafeDetailMenuSection from '@/components/cafe/CafeDetailMenuSection.vue'
import CafeDetailOptionSection from '@/components/cafe/CafeDetailOptionSection.vue'

const { handleError } = useCommonSetup()

const route = useRoute()
const store = useStore()

const isLoaded = ref(false)
const cafeDetail = ref(null)
const selectStep = ref(0)
const selectedCategory = ref(null)
const selectedMenu = ref(null)

const turnOnLoading = () => store.commit('common/turnOnLoading')
const turnOffLoading = () => store.commit('common/turnOffLoading')

const selectCategory = (category) => {
  selectedCategory.value = category
  selectStep.value++  // open CafeMenuSection component
}

const selectMenu = (cafeMenu) => {
  console.log(cafeMenu)
  selectedMenu.value = cafeMenu
  selectStep.value++
}

const goBackToCategory = () => {
  selectStep.value--  // open CafeCategorySection component
  selectedCategory.value = null
}

const goBackToMenu = () => {
  selectStep.value--
  selectedMenu.value = null
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

// TODO 한 페이지 category 개수에 따라 pagination(prev, next) 기능 구현
</script>

<style>
</style>