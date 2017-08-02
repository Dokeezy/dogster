// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './store/index'
import VueFire from 'vuefire'

let config = {
  apiKey: "AIzaSyBJ099wVlqPrJWVrp1_iQH55fbm5oTqXQk",
  authDomain: "dogster-dd27f.firebaseapp.com",
  databaseURL: "https://dogster-dd27f.firebaseio.com",
  projectId: "dogster-dd27f",
  storageBucket: "dogster-dd27f.appspot.com",
  messagingSenderId: "1095743695981"
};

firebase.initializeApp(config);

window.firebase = firebase;

Vue.use(VueFire);
Vue.use(Vuetify);
Vue.config.productionTip = false

/* eslint-disable no-new */
const unsuscribe = firebase.auth().onAuthStateChanged(user => {
  // Assure to have the last current status of the user
  store.dispatch('setUser', user);

  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });

  // Prevent to create new instance at each auth status change
  unsuscribe();
});
