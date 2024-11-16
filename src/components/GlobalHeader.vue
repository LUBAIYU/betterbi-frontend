<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/router/routes'
import { useUserStore } from '@/stores/UserStore'
import { getLoginUserAPI, userLogoutAPI } from '@/api/user'
import { message } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const [messageApi] = message.useMessage()

// 菜单选中项
const current = ref<string[]>(['/'])
// 登录用户信息
const userInfo = ref<API.UserVo>()

// 更新菜单选中项
router.afterEach(to => {
  current.value = [to.path]
})

// 可供选择的菜单项
const menuItems = computed(() => {
  return routes.filter(route => {
    return !route.meta?.hidden
  })
})

// 生成菜单项
const items = computed(() => {
  return menuItems.value.map(item => {
    return {
      key: item.path,
      label: item.name,
      title: item.name,
      onclick: () => {
        router.push(item.path)
      },
    }
  })
})

// 获取登录用户信息
const getLoginUser = async () => {
  userInfo.value = userStore.getUserInfo()
  if (userInfo.value) {
    return
  }
  const res = await getLoginUserAPI()
  if (res.code === 200) {
    userInfo.value = res.data
    userStore.setUserInfo(res.data)
  } else {
    messageApi.error(res.message)
    router.push('/user/login')
  }
}

// 退出登录
const userLogout = async () => {
  const res = await userLogoutAPI()
  if (res.code === 200) {
    userStore.setUserInfo(undefined)
    router.push('/user/login')
  } else {
    messageApi.error(res.message)
  }
}

onMounted(() => getLoginUser())
</script>

<template>
  <div id="globalHeader">
    <div class="logo">
      <img src="@/assets/betterbi-logo.png" alt="" />
      <h2 class="font">智能BI</h2>
    </div>
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    <div class="avatar-position">
      <a-dropdown placement="bottom">
        <a-avatar size="large" :src="userInfo?.userAvatar">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="userLogout">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
#globalHeader {
  display: flex;
  width: 100%;
}

#globalHeader .logo {
  display: flex;
  height: 48px;
  margin: 10px 0 0 -20px;
}

#globalHeader .font {
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0 20px 0 10px;
}

.avatar-position {
  margin-left: auto;
}
</style>
