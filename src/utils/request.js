import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

// 配置icode 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.icode = 'F7CEF22D3DFD9445'
    return config
  }
)

export default service
