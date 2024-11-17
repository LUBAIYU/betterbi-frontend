import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { useUserStore } from '@/stores/UserStore'
import { getLoginUserAPI } from '@/api/user'
import { message } from 'ant-design-vue'

const [messageApi] = message.useMessage()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * 全局前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 如果用户已登录，则跳转到首页
  if (to.path === '/user/login' || to.path === '/user/register') {
    next()
    return
  }
  // 判断用户是否已登录
  const userInfo = userStore.getUserInfo()
  if (userInfo) {
    next()
    return
  }
  // 获取用户登录信息
  const res = await getLoginUserAPI()
  if (res.code === 200) {
    next()
    return
  }
  messageApi.error(res.message)
  router.push('/user/login')
})

export default router
