<template>
  <div>
    <v-toolbar color="white">
      <v-btn icon="mdi-arrow-left" @click="$emit('goBackToMenu')" />
    </v-toolbar>

    <v-card-item>
      <v-card-title>{{ cafeMenu?.name }}</v-card-title>
    </v-card-item>

    <v-card-text>
      {{ cafeMenu?.description }}
    </v-card-text>

    <div class="mx-9 flex justify-end">
      {{ $filters.currencyKOR(totalPrice) }}
    </div>
    <div class="mx-9 flex justify-end">
      3개
    </div>
    <div 
      v-for="(menuOption, index) in cafeMenu?.menuOptions ?? []"
      :key="`menuOption_${menuOption.menuOptionId}`"
    >
      <div class="bg-yellow-600 my-2">
        {{ menuOption.title }}
      </div>
      <v-radio-group v-model="options[index]">
        <v-radio
          v-for="optionDetail in menuOption.optionDetails"
          :key="`optionDetail_${optionDetail.optionDetailId}`"
          :value="optionDetail"
          class="my-2"
        >
          <template #label>
            <div class="flex w-full">
              <div class="self-center mr-5">
                {{ optionDetail.name }}
              </div>
              <div class="self-center">
                <v-chip v-if="optionDetail.extraPrice">
                  {{ $filters.currencyKOR(optionDetail.extraPrice) }}
                </v-chip>
              </div>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  cafeMenu: {
    type: Object,
    default: null,
    required: true
  }
})

defineEmits(['goBackToMenu'])

const options = ref([])

const totalPrice = computed(() => 
  props.cafeMenu.price + 
  options.value
    .map(option => option.extraPrice)
    .reduce((prevTotalPrice, currentPrice) => prevTotalPrice + currentPrice, 0)
)
</script>

<style lang="scss" scoped>
</style>