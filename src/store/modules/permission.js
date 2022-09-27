import router, { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    setRoutes (state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes (context, menus) {
      // 匹配后的路由表
      const routes = []
      // 路有权限匹配
      menus.forEach(item => {
        routes.push(...privateRoutes.filter(route => route.name === item))
      })
      // 添加404规则
      router.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
