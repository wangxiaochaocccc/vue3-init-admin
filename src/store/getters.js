// import Variable from '@/assets/styles/variable.scss'
import { generateColors } from '@/utils/theme.js'
import { getItem } from '@/utils/storage.js'
import { MAIN_COLOR } from '@/constant'
// 快捷访问
const getters = {
  token: state => state.user.token,
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.app.sideBarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor
}

export default getters
