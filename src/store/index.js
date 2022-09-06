import Vue from 'vue'
import Vuex from 'vuex';
import todoStoreModule from './todo';

Vue.use(Vuex);
// Create a new store instance.
const store = new Vuex.Store({
  modules: {
      todo: {
          namespaced: true,
          ...todoStoreModule
      },
  }
})

export default store;

