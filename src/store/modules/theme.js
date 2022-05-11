import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { setItem, getItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  mutations: {
    setThemeColor (state, newColor) {
      state.mainColor = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
