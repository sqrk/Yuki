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
    isLogged: false,
    challengePath: null
  },
  plugins: [vuexLocal.plugin],
  mutations: {
    setLogged(state, isLogged) {
      state.isLogged = isLogged;
    },

    setUser(state, user) {
      state.user = user;
    },
    setChallengePath(state, challengePath) {
      state.challengePath = challengePath;
    },
    setActiveChallenge(state, activeChallenge) {
      state.user.activeChallenge = activeChallenge;
    }
  },
  actions: {
    setLogged({ commit }, isLogged) {
      commit("setLogged", isLogged);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setChallengePath({ commit }, challengePath) {
      commit("setChallengePath", challengePath);
    },
    setActiveChallenge({ commit }, activeChallenge) {
      commit("setActiveChallenge", activeChallenge);
    }
  }
});
