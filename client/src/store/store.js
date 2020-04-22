import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage // TODO lookup localForage
});

export default new Vuex.Store({
  strict: true, // Can't change the state unless through action/mutation
  state: {
    user: null,
    isLogged: false
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    setLogged(state, isLogged) {
      state.isLogged = isLogged;
    },

    setUser(state, user) {
      state.user = user;
    },
    setActiveChallenge(state, activeChallenge) {
      state.user.activeChallenge = activeChallenge;
    },
    increaseScore(state) {
      state.user.score += 200;
    }
  },
  actions: {
    setLogged({ commit }, isLogged) {
      commit("setLogged", isLogged);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setActiveChallenge({ commit }, activeChallenge) {
      commit("setActiveChallenge", activeChallenge);
    }
  }
});
