import { TOKEN_TIMEOUT_VALUE, TOKEN_TIMESTAMP } from '@/constant/index'
import { setItem, getItem } from '@/utils/storage'
// 设置时间戳
export const setTimeStamp = () => {
  setItem(TOKEN_TIMESTAMP, Date.now())
}
// 获取时间戳
export const getTimeStamp = () => {
  return getItem(TOKEN_TIMESTAMP)
}
// 判断是否超时
export const isCheckTimeStamp = () => {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const tokenTime = getTimeStamp()
  // 比较是否大于失效时间
  return currentTime - tokenTime > TOKEN_TIMEOUT_VALUE
}
