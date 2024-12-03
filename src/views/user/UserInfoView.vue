<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SelectProps, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { getLoginUserAPI, updateUserByIdAPI, uploadAvatarAPI } from '@/api/user'
import { useUserStore } from '@/stores/UserStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const userInfo = ref<API.UserVo>({
  id: '',
  userAccount: '',
  userAvatar: '',
  userName: '',
  userRole: 1,
  createTime: new Date(),
  updateTime: new Date(),
})

const options = ref<SelectProps['options']>([
  {
    value: 0,
    label: '管理员',
  },
  {
    value: 1,
    label: '普通用户',
  },
])

const fileList = ref([])
const loading = ref<boolean>(false)

// 上传文件校验
const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传 JPG 或 PNG 图片文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('文件大小不能超过2MB!')
  }
  return isJpgOrPng && isLt2M
}

// 上传头像
const uploadAvatar = async ({ file }) => {
  loading.value = true
  const formData = new FormData()
  formData.append('multipartFile', file)
  const res = await uploadAvatarAPI(formData)
  if (res.code === 200) {
    userInfo.value.userAvatar = res.data
  } else {
    message.error(res.message)
  }
  loading.value = false
}

// 获取用户登录信息
const getLoginUser = async () => {
  const loginUser = userStore.getUserInfo()
  if (loginUser) {
    userInfo.value = loginUser
    return
  }
  const res = await getLoginUserAPI()
  if (res.code === 200) {
    userInfo.value = res.data
    userStore.setUserInfo(res.data)
  } else {
    message.error(res.message)
    router.push('/user/login')
  }
}

// 更新用户信息
const updateUserInfo = async () => {
  const res = await updateUserByIdAPI({
    ...userInfo.value,
  })
  if (res.code === 200) {
    message.success('保存成功')
  } else {
    message.error(res.message)
  }
}

onMounted(() => getLoginUser())
</script>

<template>
  <div id="userInfoView">
    <a-card title="修改信息" :bordered="false" class="card-style">
      <a-form :model="userInfo">
        <a-form-item label="账号">
          <a-input v-model:value="userInfo.userAccount" class="input-style" />
        </a-form-item>
        <a-form-item label="头像">
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :show-upload-list="false"
            :with-credentials="true"
            :custom-request="uploadAvatar"
            style="margin-left: 48px"
          >
            <a-image v-if="userInfo.userAvatar" :src="userInfo.userAvatar" />
            <div v-else>
              <loading-outlined v-if="loading" />
              <plus-outlined v-else />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model:value="userInfo.userName" class="input-style" />
        </a-form-item>
        <a-form-item label="角色">
          <a-select
            v-model:value="userInfo.userRole"
            :options="options"
            class="input-style"
            disabled
          />
        </a-form-item>
        <a-form-item label="创建时间">
          <a-input
            v-model:value="userInfo.createTime"
            style="margin-left: 20px; width: 92.5%"
            disabled
          />
        </a-form-item>
        <a-form-item>
          <a-button @click="updateUserInfo" type="primary" style="width: 300px"
            >保存
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
#userInfoView {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: hidden;
}

.card-style {
  max-width: 80%;
  width: 100%;
  margin: 20px;
}

.input-style {
  width: 90%;
  margin-left: 50px;
}
</style>
