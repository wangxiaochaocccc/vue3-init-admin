import store from '@/store'

const removeNode = (el, binding) => {
  // 获取权限
  const { value } = binding
  // 获取角色权限
  const permissions = store.getters.userInfo.permission.points

  if (value && value instanceof Array) {
    // 看是否具有权限
    const hasPermission = permissions.some(item => {
      return value.includes(item)
    })
    // 没有权限删除node节点
    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  } else {
    throw new Error('v-permission的必须是一个数组')
  }
}
export default {
  // 父组件挂载之后调用
  mounted (el, binding) {
    removeNode(el, binding)
  },
  // 在包含组建的vnode及其子组件vnode更新后调用
  update (el, binding) {
    removeNode(el, binding)
  }
}
