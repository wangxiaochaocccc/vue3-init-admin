import request from '@/utils/request'

/**
 * 获取员工列表
 */
export const getManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}
