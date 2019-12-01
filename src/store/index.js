import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchInput: '',
    activeHeaderTab: '',
  },
  mutations: {
    updateSearchInput(state, value) {
      state.searchInput = value;
    },
    updateActiveHeaderTab(state, value) {
      state.activeHeaderTab = value;
    },
  },
  actions: {
    resetSearchInput({ commit }) {
      commit('updateSearchInput', '');
    },
    updateSearchInput({ commit }, value) {
      commit('updateSearchInput', value);
    },
    resetActiveHeaderTab({ commit }) {
      commit('updateActiveHeaderTab', '');
    },
    updateActiveHeaderTab({ commit }, value) {
      commit('updateActiveHeaderTab', value);
    },
  },
  modules: {},
});
