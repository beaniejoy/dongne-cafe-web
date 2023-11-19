import { computed } from 'vue'
import { useDisplay } from 'vuetify'

export default function useCafeDetailSetup() {

  const { name } = useDisplay()

  const categoryColSize = computed(() => {
    switch (name.value) {
    case 'xs': return 12
    case 'sm': return 6
    case 'md': return 4
    case 'lg': return 3
    case 'xl': return 3
    case 'xxl': return 3
    }
  
    return undefined
  })

  return {
    categoryColSize
  }
}