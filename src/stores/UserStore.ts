import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let userInfo: API.UserVo | undefined

  const setUserInfo = (user: API.UserVo | undefined) => {
    userInfo = user
  }

  const getUserInfo = (): API.UserVo | undefined => {
    return userInfo
  }

  return {
    setUserInfo,
    getUserInfo,
  }
})
