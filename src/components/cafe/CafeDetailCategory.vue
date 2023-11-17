<template>
  <div>
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-for="(category, index) in cafeMenuCategories"
        :key="`category_slide_${category.menuCategoryId}`"
        v-slot="{ isSelected }"
      >
        <v-btn
          class="ma-2"
          rounded
          :color="isSelected ? 'primary' : undefined"
          @click="moveToCategoryDirectly(index)"
        >
          {{ category.name }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    <v-sheet
      v-for="(category) in cafeMenuCategories" 
      :key="`category_${category.menuCategoryId}`"
      ref="categoryRefs"
      border
      class="py-4"
    >
      <div class="mb-4 px-2">
        <v-card-title>
          {{ category.name }}
        </v-card-title>

        <v-card-subtitle>{{ category.description }}</v-card-subtitle>
      </div>
      <v-row align="center" justify="center">
        <v-col
          v-for="menu in category.cafeMenus"
          :key="`menu_${menu.cafeMenuId}`"
          cols="auto"
        >
          <v-card elevation="0">
            <v-img 
              src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
              width="150"
            />
            <div class="text-center">
              <v-card-title class="py-0">
                {{ menu.name }}
              </v-card-title>
  
              <v-card-subtitle>{{ $filters.currencyKOR(menu.price) }}</v-card-subtitle>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  cafeMenuCategories: {
    type: Array,
    default: () => [],
    required: true
  }
})

const categoryRefs = ref([])

function moveToCategoryDirectly(index) {
  categoryRefs.value[index]
    .$el
    .scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
</style>