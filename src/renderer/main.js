import Vue from "vue";

import "nprogress/nprogress.css";

import App from "./App";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;
import useContextMenu from "@/hooks/useContextMenu";
useContextMenu();

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: "<App/>",
}).$mount("#app");
