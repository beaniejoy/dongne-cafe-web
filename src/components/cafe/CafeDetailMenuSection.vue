<template>
  <div>
    <v-toolbar color="white">
      <v-btn icon="mdi-arrow-left" @click="$emit('goBackToCategory')" />
      <v-toolbar-title>
        {{ category.name }}
      </v-toolbar-title>
      <template #extension>
        <div class="mx-9">
          {{ category.description }}
        </div>
      </template>
    </v-toolbar>
    <v-row
      align="center"
      justify="start" 
      class="w-full mx-0 my-0 px-5 py-5"
    >
      <v-col
        v-for="menu in category.cafeMenus"
        :key="`menu_${menu.cafeMenuId}`"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        xxl="3"
        cols="12"
        class="px-4 py-4"
      >
        <v-card
          elevation="0"
          hover
          class="mx-auto"
          width="160"
        >
          <v-img 
            src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
            cover
            aspect-ratio="1"
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
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    default: null,
    required: true
  }
})

defineEmits(['goBackToCategory'])
</script>

<style lang="scss" scoped>
</style>