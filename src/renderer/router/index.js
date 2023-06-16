import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/",
    },
    {
      path: "/index",
      name: "index",
      component: require("@/view/index/index.vue").default,
    },
    {
      path: "/",
      name: "login",
      component: require("@/view/login/index.vue").default,
    },
  ],
});
