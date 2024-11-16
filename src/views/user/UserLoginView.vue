<script setup lang="ts">
import { computed, ref } from 'vue'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { userLoginAPI } from '@/api/user'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

const router = useRouter()
const userStore = useUserStore()

const formData = ref<API.UserLoginParams>({
  userAccount: '',
  userPassword: '',
})

const disabled = computed(() => {
  return !(formData.value.userAccount && formData.value.userPassword)
})

const userLogin = async () => {
  const res = await userLoginAPI(formData.value)
  if (res.code === 200) {
    message.success('登录成功')
    userStore.setUserInfo(res.data)
    router.push('/')
  } else {
    message.error(res.message)
  }
}
</script>

<template>
  <div id="userLoginView">
    <div class="header">
      <h2 class="font">用户登录</h2>
    </div>
    <div class="form">
      <a-form :model="formData" @finish="userLogin">
        <a-form-item
          label="账号"
          name="userAccount"
          :rules="[
            { required: true, message: '请输入账号' },
            {
              min: 4,
              message: '账号长度不能小于4位',
            },
          ]"
        >
          <a-input v-model:value="formData.userAccount" style="width: 300px">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="密码"
          name="userPassword"
          :rules="[
            { required: true, message: '请输入密码' },
            {
              min: 8,
              message: '密码长度不能小于8位',
            },
          ]"
        >
          <a-input-password
            v-model:value="formData.userPassword"
            style="width: 300px"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            style="width: 355px"
            html-type="submit"
            >登 录
          </a-button>
          <div style="text-align: right; margin-top: 10px">
            还没有账号？请
            <span
              style="color: #4fb2f5; cursor: pointer"
              @click="$router.push('/user/register')"
              >注册</span
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
#userLoginView {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png');
  background-size: contain;
  min-height: 85vh;
}

.header {
  display: flex;
  align-items: center;
}

.logo {
  flex: 1;
  height: 48px;
}

.font {
  margin-top: 8px;
  margin-left: 10px;
  font-weight: bold;
}

.form {
  margin-top: 10px;
  max-width: 480px;
}
</style>
