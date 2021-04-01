export default {
  state: {
    user: null,
    id_store: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateStore(state, id) {
      state.id_store.push(id);
    },
  },
  actions: {
    setAuthenticatedUser(context, user) {
    //   console.log(user);
    //   console.log('Hi from auth');
      context.commit('setUser', user);
    },
    set_id_store(context, id) {
      context.commit('updateStore', id);
    },
  },
  getters: {
    authenticated(state) {
      return state.user != null;
    },
    get_id_store(state) {
      return state.id_store;
    },
  },
};
