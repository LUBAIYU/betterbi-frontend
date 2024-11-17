import axios from 'axios'

/**
 * 统一请求配置
 */
const request = axios.create({
  baseURL: 'http://localhost:8000/api',
  //timeout: 3000,
  withCredentials: true,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  res => res.data,
  error => {
    return Promise.reject(error)
  },
)

export default request
