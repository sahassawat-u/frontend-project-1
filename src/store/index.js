import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Todos from './todos';
import Auth from './auth';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    todos: { ...Todos, namespaced: true },
    auth: { ...Auth, namespaced: true },
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});
Vue.$store = store;

export default store;
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   },
// });
