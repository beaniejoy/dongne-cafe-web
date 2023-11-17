<template>
  <v-carousel
    cycle
    height="250"
    show-arrows="hover"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(image, i) in cafeImages"
      :key="`image_${i}`"
      :src="image.imgUrl"
      height="100%"
      cover
    />
  </v-carousel>
</template>

<script setup>
defineProps({
  cafeImages: {
    type: Array,
    default: () => [],
    required: true
  }
})
</script>

<style lang="scss" scoped>
</style>