import request from '@/utils/request'

// 登录
export const login = data => {
  return request({
    url: '/sys/login',
    methods: 'POST',
    data
  })
}
