import Vue from "vue";
import VueRouter from "vue-router";
//import { fb } from "../firebase";
import store from "../store/store";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import DiscomfortTestPage from "../views/DiscomfortTestPage";
import ProfilePage from "../views/ProfilePage";
import FeedPage from "../views/FeedPage";
import MoreHelpPage from "../views/MoreHelpPage";

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
  },
  {
    path: "/feed",
    name: "feed_path",
    component: FeedPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/more-help",
    name: "more_help_path",
    component: MoreHelpPage,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = store.state.user;

  //Check if path requires auth and user not logged in
  if (requiresAuth && !currentUser) {
    next({ name: "root_path" });
  } else {
    next();
  }
});

export default router;
