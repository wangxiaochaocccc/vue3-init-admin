import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeStamp } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

// 配置icode 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (isCheckTimeStamp()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // config.headers.Accept_Language = store.getters.language
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    config.headers['Accept-Language'] = store.getters.language
    config.headers.icode = '61821CB75FB1C30A'
    return config
  }
)

// 相应数据拦截
service.interceptors.response.use(
  response => {
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error?.response?.data?.code === 401) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
