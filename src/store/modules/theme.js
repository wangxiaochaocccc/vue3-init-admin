import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { setItem, getItem } from '@/utils/storage'
import variables from '@/assets/styles/variable.scss'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    setThemeColor (state, newColor) {
      state.mainColor = newColor
      state.variables.menubg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
