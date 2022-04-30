/*
 * 判断是否为外部资源
 * @Author: 王超
 * @Date: 2022-04-30 22:12:23
 * @Last Modified by: 王超
 * @Last Modified time: 2022-04-30 22:14:08
 */

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
