<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getLoginUserAPI } from '@/api/user'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import GlobalHeader from '@/components/GlobalHeader.vue'

const router = useRouter()

const loginUser = ref<API.UserVo>()

const getLoginUser = async () => {
  const res = await getLoginUserAPI()
  if (res.code === 200) {
    loginUser.value = res.data
  } else {
    message.error(res.message)
    router.push('/user/login')
  }
}

onMounted(() => getLoginUser())
</script>

<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <div class="logo">
          <img src="@/assets/betterbi-logo.png" alt="" />
          <h2 class="font">智能BI</h2>
        </div>
        <global-header />
      </a-layout-header>
      <a-layout-content class="content"></a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/LUBAIYU" target="_blank">
          GitHub地址 by 路白榆
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header {
  display: flex;
  background-color: #ffffff;
  position: fixed;
  z-index: 1;
  width: 100%;
}

#basicLayout .header .logo {
  display: flex;
  height: 48px;
  margin: 10px 0 0 -20px;
}

#basicLayout .header .font {
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 0 20px 0 10px;
}

#basicLayout .content {
  background: #efefef;
  display: grid;
}

#basicLayout .footer {
  background: #ffffff;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
