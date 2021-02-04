import Vue from 'vue'
import Router from 'vue-router'

const index = () => import(/* webpackChunkName: 'login' */ './views/index.vue')
// const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
// const Forget = () =>
//   import(/* webpackChunkName: 'forget' */ './views/Forget.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // component: Layout,
      // name: '/',
      redirect: '/index'
      // children: [{
      // path: '/',
      // name: 'home',
      // component: () => import(/* webpackChunkName: "Zone" */ '@/views/Zone.vue'),
      // meta: { title: '首页', icon: 'el-icon-s-home' }
      // }]
    },
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: 'tool' */ './views/index.vue')
    }
  ]
})
