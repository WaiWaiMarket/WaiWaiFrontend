import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
