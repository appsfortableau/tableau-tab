import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import "./sass/app.scss";

Vue.config.productionTip = false;
// Before you create app
Vue.config.devtools = true;

new Vue({
  store,
  render: h => h(App),
  created() {
    let tableauEmbedJS = document.createElement("script");
    tableauEmbedJS.setAttribute(
      "src",
      "https://eu-west-1a.online.tableau.com/javascripts/api/tableau-2.3.0.min.js"
    );
    document.head.appendChild(tableauEmbedJS);
  }
}).$mount("#app");
