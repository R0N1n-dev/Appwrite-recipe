import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../stores/user";
const requireAuth = async (to, from, next) => {
  const store = useUserStore();
  store.loadingSession = true;
  const user = store.user;
  if (user !== null) {
    next();
  } else {
    next("/login");
  }
  store.loadingSession = false;
};
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      beforeEnter: requireAuth,
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/recipe/:id",
      name: "singleRecipe",
      component: () => import("../views/SingleRecipe.vue")
    }
  ]
});

export default router;
