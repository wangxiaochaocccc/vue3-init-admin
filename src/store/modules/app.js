import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sideBarOpened: true,
    language: getItem(LANG) || ''
  }),
  mutations: {
    triggerSideBarOpened (state) {
      state.sideBarOpened = !state.sideBarOpened
    },
    setLanguage (state, lang) {
      state.language = lang
      setItem(LANG, lang)
    }
  }
}
