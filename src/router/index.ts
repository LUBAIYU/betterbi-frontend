import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '用户登录',
      path: '/user/login',
      component: () => import('@/views/user/UserLoginView.vue'),
    },
    {
      name: '用户注册',
      path: '/user/register',
      component: () => import('@/views/user/UserRegisterView.vue'),
    },
  ],
})

export default router
