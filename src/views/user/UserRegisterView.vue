<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CheckCircleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { userRegisterAPI } from '@/api/user'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

const router = useRouter()

const validateCheckPassword = (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入确认密码')
  } else if (value !== formData.value.userPassword) {
    return Promise.reject('密码不一致')
  }
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  userAccount: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    {
      min: 4,
      message: '账号长度不能小于4位',
      trigger: 'blur',
    },
  ],
  userPassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 8,
      message: '密码长度不能小于8位',
      trigger: 'blur',
    },
  ],
  checkPassword: [
    {
      required: true,
      validator: validateCheckPassword,
      trigger: 'blur',
    },
  ],
}

const formData = ref<API.UserRegisterParams>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const disabled = computed(() => {
  return !(
    formData.value.userAccount &&
    formData.value.userPassword &&
    formData.value.checkPassword
  )
})

const userRegister = async () => {
  const res = await userRegisterAPI(formData.value)
  if (res.code === 200) {
    message.success('注册成功')
    router.push('/user/login')
  } else {
    message.error(res.message)
  }
}
</script>

<template>
  <div id="userRegisterView">
    <div class="header">
      <img class="logo" src="@/assets/betterbi-logo.png" alt="" />
      <h2 class="font">用户注册</h2>
    </div>
    <div class="form">
      <a-form :model="formData" @finish="userRegister" :rules="rules">
        <a-form-item label="账号" name="userAccount">
          <a-input v-model:value="formData.userAccount">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码" name="userPassword">
          <a-input-password v-model:value="formData.userPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item label="确认密码" name="checkPassword">
          <a-input-password v-model:value="formData.checkPassword">
            <template #prefix>
              <CheckCircleOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            style="width: 355px"
            html-type="submit"
            >注 册
          </a-button>
          <div style="text-align: right; margin-top: 10px">
            已经有账号？请
            <span
              style="color: #4dacec; cursor: pointer"
              @click="$router.push('/user/login')"
              >登录</span
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
#userRegisterView {
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
  min-width: 350px;
}
</style>
