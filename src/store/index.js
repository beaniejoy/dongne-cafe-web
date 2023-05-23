import { createStore } from 'vuex'
import common from '@/store/common'
import cafe from '@/store/cafe'

export default createStore({
  modules: {
    common,
    cafe
  }
})
