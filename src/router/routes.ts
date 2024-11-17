import type { RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    name: '首页',
    path: '/',
    redirect: '/add_chart',
    meta: {
      hidden: true,
    },
  },
  {
    name: '用户登录',
    path: '/user/login',
    component: () => import('@/views/user/UserLoginView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    name: '用户注册',
    path: '/user/register',
    component: () => import('@/views/user/UserRegisterView.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    name: '添加图表页',
    path: '/add_chart',
    component: () => import('@/views/chart/ChartAddView.vue'),
  },
]
