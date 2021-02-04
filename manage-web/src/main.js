import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jquery from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/veevalidate'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$ = jquery

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
