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
        await store.dispatch('user/getUserInfo')
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
