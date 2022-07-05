import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.withCredentials = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
