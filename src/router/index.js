import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user'
import good from '@/components/good'
import record from '@/components/record'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: user
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/good',
      name: 'good',
      component: good
    },
    {
      path: '/record',
      name: 'record',
      component: record
    }
  ]
})
