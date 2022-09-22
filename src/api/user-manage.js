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
// 上传数据
export const useBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'post',
    data
  })
}
/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}
/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}
