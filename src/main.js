import Vue from 'vue';
import App from './App.vue';
import store from './store';

import './sass/app.scss';

Vue.config.productionTip = false;
// Before you create app
Vue.config.devtools = true;

console.log('Loaded Vue app');
console.log('Env', process.env);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
