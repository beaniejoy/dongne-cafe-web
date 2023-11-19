<template>
  <div>
    <v-toolbar color="white">
      <v-btn icon="mdi-arrow-left" @click="$emit('goBackToMenu')" />
      <v-toolbar-title>
        {{ cafeMenu?.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title>{{ $filters.currencyKOR(cafeMenu?.price) }}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script setup>
defineProps({
  cafeMenu: {
    type: Object,
    default: null,
    required: true
  }
})

defineEmits(['goBackToMenu'])
</script>

<style lang="scss" scoped>
</style>