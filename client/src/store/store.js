import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // can't change the state unless through action/mutation
  state: {
    user: null,
    isLogged: false
  },
  mutations: {
    // same name as action but gets param from action and updates state
    setLogged(state, isLogged) {
      state.isLogged = isLogged;
    },

    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    // async, commits by calling mutation?
    setLogged({ commit }, isLogged) {
      commit("setLogged", isLogged);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    }
  }
});
