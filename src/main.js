import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.withCredentials = true

new Vue({
  render: h => h(App),
}).$mount('#app')
