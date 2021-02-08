import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    tabsList: []
  },
  mutations: {
    updateTabsList (state, data) {
      state.tabsList = data
    },
    addTab (state, data) {
      state.tabsList.push(data)
    },
    delTab (state, index) {
      state.tabsList.splice(index, 1)
    },
    clearTabs (state) {
      state.tabsList = []
    }
  },
  actions: {

  }
})
