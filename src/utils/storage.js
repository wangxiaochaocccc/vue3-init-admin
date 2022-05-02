
// 获取数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
// 设置数据
export const setItem = (key, val) => {
  if (typeof (val) === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}
// 删除指定数据ak
export const clearItem = (key) => {
  window.localStorage.remove(key)
}
// 删除所有数据
export const clearAllItem = () => {
  window.localStorage.clear()
}
