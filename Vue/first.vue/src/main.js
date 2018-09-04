import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store';

Vue.config.productionTip = false


Vue.filter('test', (val) => {
  return 'test';
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
