import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  currentUser: null,
  publications: []
}

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },
  SET_PUBLICATIONS(state, publications) {
    state.publications = publications;
  },
}

const actions = {
  setUser({commit}, user) {
    commit("SET_USER", user);
  },
  setPublications({commit}, publications) {
    commit("SET_USER", publications);
  },
}

const getters = {
  currentUser: state => state.currentUser,
  publications: state => state.publications,
  ownPublications (state, userId) {
    return state.publications.filter((publication) => {
      return publication.user.id === userId
    });
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
