import { createRouter, createWebHashHistory } from "vue-router";
import getUser from "../../services/User";
const notfound = import("../NotFound.vue");
const movies = import("../Movies.vue");
const login = import("../Login.vue");
const register = import("../Register.vue");
const newmovie = import("../NewMovie.vue");
const logout = import("../Logout.vue");
const customers = import("../Customers.vue");
const rentals = import("../Rentals.vue");

const user = getUser();
const routes = [
  { path: "/vidly", redirect: "/" },
  { path: "/movies", redirect: "/" },
  { path: "/", component: movies, props: { user: user } },
  { path: "/404", component: notfound },
  { path: "/login", name: "login", component: login },
  { path: "/register", component: register },
  { path: "/logout", component: logout },
  { path: "/customers", component: customers },
  { path: "/rentals", component: rentals },
  { path: "/newmovie", component: newmovie },
  { path: "/:pathMatch(.*)", redirect: "/404" },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
