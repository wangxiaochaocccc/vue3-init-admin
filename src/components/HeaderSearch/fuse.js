import path from 'path'
import i18n from '@/i18n'

export const generateRoutes = (routes, baseUrl = '/', pretitle = []) => {
  // 结果
  let res = []
  // 遍历路由表
  for (const route of routes) {
    const data = {
      path: path.resolve(baseUrl, route.path),
      title: [...pretitle]
    }
    // 点前存在meta时，用i18n处理，组成新的title
    // 排除动态路由
    const reg = /.*\/:.*/
    if (route?.meta?.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    // 如果存在children
    if (route.children) {
      const tempRoute = generateRoutes(route.children, data.path, data.title)
      if (tempRoute.length >= 1) {
        res = [...res, ...tempRoute]
      }
    }
  }
  return res
}
