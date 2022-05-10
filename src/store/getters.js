import Variable from '@/assets/styles/variable.scss'

// 快捷访问
const getters = {
  token: state => state.user.token,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => Variable,
  sidebarOpened: state => state.app.sideBarOpened,
  language: state => state.app.language
}

export default getters
