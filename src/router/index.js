import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user'
import teacherInfo from '../components/teacher-info.vue'
import examInfo from '../components/exam-info.vue'
import workInfo from '../components/work-info.vue'
import login from '../components/login.vue'
// import record from '@/components/record'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: user
    },
    {
      path: '/exam',
      name: 'exam',
      component: examInfo
    },
    {
      path: '/work',
      name: 'work',
      component: workInfo
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teacherInfo
    }
  ]
})
