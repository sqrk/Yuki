import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
//import * as firebase from "firebase";
import router from "./router/router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import { sync } from "vuex-router-sync";
import store from "./store/store";
import "./assets/css/styles.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

sync(store, router);

// let app = "";

//Mount only the first time auth state changes
//firebase.auth().onAuthStateChanged(() => {
//   if(!app) {
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// }
//});
