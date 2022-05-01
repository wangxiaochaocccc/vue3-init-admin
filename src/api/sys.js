import request from '@/utils/request'

/**
 * 登录
 */
export const login = data => {
  console.log(11, data)
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
