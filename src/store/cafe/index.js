export default {
  namespaced: true,

  state: {
    // cafe search bar check disabled
    searchBarDisabled: false,
  },
  mutations: {
    updateSearchBarDisabled(state, searchBarDisabled) {
      state.searchBarDisabled = searchBarDisabled
    }
  }
}