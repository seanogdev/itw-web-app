import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchInput: '',
  },
  mutations: {
    updateSearchInput(state, value) {
      state.searchInput = value;
    },
  },
  actions: {
    resetSearchInput({ commit }) {
      commit('updateSearchInput', '');
    },
    updateSearchInput({ commit }, value) {
      commit('updateSearchInput', value);
    },
  },
  modules: {
  },
});
