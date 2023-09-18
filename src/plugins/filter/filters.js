import * as cafeFilters from './CafeFilters'

export default {
  install(app) {
    app.config.globalProperties.$filters = {
      ...cafeFilters
    }
  }
}