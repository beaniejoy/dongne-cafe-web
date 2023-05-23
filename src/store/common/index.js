export default {
  namespaced: true,

  state: {
    displayLoading: false,
  },
  mutations: {
    turnOnLoading(state) {
      state.displayLoading = true
    },
    turnOffLoading(state) {
      state.displayLoading = false
    }
  }
}