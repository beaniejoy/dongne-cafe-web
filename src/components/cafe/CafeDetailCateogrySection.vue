<template>
  <v-row
    align="center"
    justify="start"
    class="w-full mx-0 my-0 px-5 py-5"
  >
    <v-col
      v-for="(category) in categories"
      :key="`category_slide_${category.menuCategoryId}`"
      :cols="categoryColSize"
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
          @click="$emit('selectCategory', category)"
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
</template>

<script setup>
import useCafeDetailSetup from '@/components/cafe/useCafeDetailSetup'

const { categoryColSize } = useCafeDetailSetup()

defineProps({
  categories: {
    type: Array,
    default: () => [],
    required: true
  }
})

defineEmits(['selectCategory'])
</script>

<style lang="scss" scoped>

</style>