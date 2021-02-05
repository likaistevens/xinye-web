import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jquery from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/veevalidate'
import API from '@/api'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$ = jquery
Vue.prototype.API = API

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
