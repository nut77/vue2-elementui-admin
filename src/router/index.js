import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: () => import('../components/common/Base.vue'),
      meta: {
        title: '公共部分'
      },
      children: [
        {
          path: '/index',
          component: () => import('../components/page/Home.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/statistics',
          component: () => import('../components/page/Statistics.vue'),
          meta: {
            title: '系统统计'
          }
        },
        {
          path: '/alarmCenter',
          component: () => import('../components/page/AlarmCenter.vue'),
          meta: {
            title: '报警中心'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue')
    },
    {
      path: '/error',
      component: () => import('../components/page/Error.vue')
    }
  ]
})
