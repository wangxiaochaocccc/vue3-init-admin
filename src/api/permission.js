import request from '@/utils/request'

/**
 * 获取权限
 */
export const getPermissionList = () => {
  return request({
    url: '/permission/list'
  })
}
