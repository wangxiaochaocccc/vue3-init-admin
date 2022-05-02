import path from 'path'
/**
 * 获取所有children路由
 **/
export const getChildrenRoutes = routes => {
  const result = []
  for (const item of routes) {
    if (item.children && item.children.length > 0) {
      result.push(...item.children)
    }
  }
  return result
}

/**
 * 把重复的一级路由过滤掉
 **/
export const filterRoutes = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  routes = routes.filter(route => {
    return !childrenRoutes.find(children => {
      return children.path === route.path
    })
  })
  return routes
}
/**
 * 判断是否为空值
 **/

const isNull = data => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
/**
 * 生成我们想要的菜单路由
 **/
export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
