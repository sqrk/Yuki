import Vue from 'vue';
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Register from "../views/Register";

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});
