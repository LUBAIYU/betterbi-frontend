import type { RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    name: '首页',
    path: '/',
    redirect: '/chart/analysis',
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
    name: '智能分析',
    path: '/chart/analysis',
    component: () => import('@/views/chart/ChartAddView.vue'),
  },
  {
    name: '我的图表',
    path: '/chart/list',
    component: () => import('@/views/chart/ChartListView.vue'),
  },
]
