import request from '@/util/request'

/**
 * 用户登录
 * @param data
 */
export const userLoginAPI = (data: API.UserLoginParams) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data,
  }) as Promise<API.Result<API.UserVo>>
}

/**
 * 用户注册
 * @param data
 */
export const userRegisterAPI = (data: API.UserRegisterParams) => {
  return request({
    method: 'POST',
    url: '/user/register',
    data,
  }) as Promise<API.Result<never>>
}

/**
 * 根据ID获取用户信息
 * @param id
 */
export const getUserByIdAPI = (id: string) => {
  return request({
    method: 'GET',
    url: `/user/get/${id}`,
  }) as Promise<API.Result<never>>
}

/**
 * 根据ID删除用户信息
 * @param id
 */
export const deleteUserByIdAPI = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/user/delete/${id}`,
  }) as Promise<API.Result<never>>
}

/**
 * 分页获取用户列表
 * @param data
 */
export const listUsersByPage = (data: API.UserPageParams) => {
  return request({
    method: 'POST',
    url: '/user/page',
    data,
  }) as Promise<API.Result<never>>
}

/**
 * 根据ID修改用户信息
 * @param data
 */
export const updateUserByIdAPI = (data: API.UserUpdateParams) => {
  return request({
    method: 'PUT',
    url: '/user/update',
    data,
  }) as Promise<API.Result<never>>
}

/**
 * 获取登录用户
 */
export const getLoginUserAPI = () => {
  return request({
    method: 'GET',
    url: '/user/getLoginUser',
  }) as Promise<API.Result<API.UserVo>>
}

// 退出登录
export const userLogoutAPI = () => {
  return request({
    method: 'POST',
    url: '/user/logout',
  }) as Promise<API.Result<never>>
}

// 获取用户信息
export const getUserVoByIdAPI = (id: string) => {
  return request({
    method: 'GET',
    url: `/user/get/vo/${id}`,
  }) as Promise<API.Result<never>>
}

// 上传头像
export const uploadAvatarAPI = (data: FormData) => {
  return request({
    method: 'POST',
    url: '/user/upload/avatar',
    data,
  }) as Promise<API.Result<string>>
}
