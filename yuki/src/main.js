import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import * as firebase from "firebase";
import router from "./router/router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/css/styles.scss";

Vue.config.productionTip = false;

Vue.prototype.$isLoggedOut = true;

let app = "";

//Mount only the first time auth state changes
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
