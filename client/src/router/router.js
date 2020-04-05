import Vue from "vue";
import VueRouter from "vue-router";
// import * as firebase from "firebase";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import DiscomfortTestPage from "../views/DiscomfortTestPage";
import ProfilePage from "../views/ProfilePage";

Vue.use(VueRouter);

 const routes = [
  {
    path: "/",
    name: "root_path",
    component: HomePage
  },
  {
    path: "/login",
    name: "login_path",
    component: LoginPage
  },
  {
    path: "/register",
    name: "register_path",
    component: RegisterPage
  },
  {
    path: "/discomfort-test",
    name: "discomfort_test_path",
    component: DiscomfortTestPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "profile_path",
    component: ProfilePage,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/*router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // const currentUser = firebase.auth().currentUser;

  //Check if path requires auth and user not logged in
  if ( requiresAuth && !currentUser) {
    next({ name: "root_path" })
  } else {
    next()
  }
});*/

export default router;
