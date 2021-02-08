import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: resolve => require(['./views/layOut'], resolve),
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '主页'
          },
          component: resolve => require(['./views/home'], resolve)
        },
        {
          path: '/control',
          name: 'control',
          meta: {
            title: '控件库'
          },
          component: resolve => require(['./views/controlManage/control'], resolve)
        },
        {
          path: '/temp',
          name: 'temp',
          meta: {
            title: '模板库'
          },
          component: resolve => require(['./views/tempManage/temp'], resolve)
        },
        {
          path: '/project-hub',
          name: 'project-hub',
          meta: {
            title: '项目仓库'
          },
          component: resolve => require(['./views/projectHub/projectHub'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: '/home',
      component: resolve => require(['./views/home'], resolve)
    }
  ]
})
