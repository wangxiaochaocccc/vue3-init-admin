import router from './router'
import store from '@/store/index'

const WhileList = ['/login']
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 快捷访问
  const token = store.getters.token
  // 存在token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        console.log(filterRoutes)
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完路由主动跳转
        return next(to.path)
      }
      next()
    }
    // 不存在token
  } else {
    if (WhileList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
