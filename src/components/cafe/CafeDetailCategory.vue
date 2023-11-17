<template>
  <div
    v-for="(category, index) in cafeMenuCategories" 
    :key="`category_${category.menuCategoryId}`"
  >
    <v-card
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
      <v-row align="center" justify="start">
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
    </v-card>

    <v-divider 
      v-if="index != cafeMenuCategories.length - 1" 
      class="py-2 bg-slate-600"
    />
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

const moveToCategoryDirectly = (index) => {
  categoryRefs.value[index]
    .$el
    .scrollIntoView({ behavior: 'smooth' })
}

defineExpose({
  moveToCategoryDirectly
})
</script>

<style lang="scss" scoped>
</style>